import { inject, observer, Provider } from 'mobx-react/native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import UserStore, { User } from '../../stores/UserStore.mobx'
import Header from '../Header'
import TouchableRiderItem from './TouchableRiderItem'

export default
@inject('UserStore')
@observer
class RidersList extends Component {
  state = {
    loading: true,
    users: [] // User[]
  }

  /**
   * Note: **All** users should be already known before
   * this list is mounted
   * TODO: Switch to getSync once API & stores prepopulate
   *   - Event members
   *   - Friends
   *
   * @memberof RidersList
   */
  componentDidMount = () => {
    this.refreshUsers()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (JSON.stringify(prevProps.userIDs) !== JSON.stringify(this.props.userIDs)) {
      this.refreshUsers()
    }
  }

  refreshUsers = async () => {
    let users = await Promise.all(
      this.props.userIDs.map(async (id) => this.props.UserStore.get(id))
    )

    this.setState({
      loading: false,
      users: users
    })
  }

  riderItemTouchable = ({ item: user }) => {
    return <Provider User={user} TextColor={this.props.textColor}>
      <TouchableRiderItem />
    </Provider>
  }

  render () {
    let headerProps = this.props.textColor ? { style: { color: this.props.textColor } } : undefined
    return (
      <View {...this.props}>
        <Header {...headerProps}>{this.props.headerText}</Header>
        {this.state.loading ? <ActivityIndicator /> : <FlatList
          data={this.state.users}
          horizontal // Option?
          renderItem={this.riderItemTouchable}
          keyExtractor={(item: User) => 'user_' + item.id}
        />}
      </View>
    )
  }
}

RidersList.propTypes = {
  UserStore: PropTypes.instanceOf(UserStore),
  headerText: PropTypes.string,
  userIDs: PropTypes.arrayOf(PropTypes.number)
}
