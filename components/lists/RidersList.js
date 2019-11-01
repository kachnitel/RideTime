import React, { Component } from 'react'
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native'
import Header from '../Header'
import TouchableRiderItem from '../list_items/TouchableRiderItem'
import PropTypes from 'prop-types'
import { Provider, inject, observer } from 'mobx-react/native'
import UserStore from '../../stores/UserStore.mobx'

export default
@inject('UserStore')
@observer
class RidersList extends Component {
  state = {
    loading: true,
    users: []
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
  componentDidMount = async () => {
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
          keyExtractor={(item, index) => 'index_' + index.toString()}
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
