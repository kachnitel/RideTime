import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import UsersList from '../components/user/UsersList'
import { inject, observer } from 'mobx-react/native'
import Layout from '../../constants/Layout'
import SearchInput from '../components/form/SearchInput'

export default
@inject('UserStore', 'ApplicationStore')
@observer
class AddFriendScreen extends Component {
  state = {
    loading: true,
    userIds: []
  }

  actions = [
    {
      icon: 'person-add',
      action: (id) => this.props.UserStore.requestFriend(id),
      // disable already sent requests
      disabled: (id) => this.props.UserStore.sentRequests.includes(id)
    }
  ]

  async componentDidMount () {
    // TODO: populate with sensible defaults?
    await this.props.UserStore.populate()
    let users = this.props.UserStore.list()

    let ids = users.filter(this.filterFriends).map((user) => user.id)

    this.setState({
      loading: false,
      userIds: ids
    })
  }

  /**
   * @memberof AddFriendScreen
   */
  handleSearchOnChange = async (val) => {
    let users = val === ''
      ? this.props.UserStore.list()
      : await this.props.UserStore.search(val)
    let ids = users.filter(this.filterFriends).map((user) => user.id)
    this.setState({ userIds: ids })
  }

  /**
   * Filter out existing friends, requests(REVIEW: show with accept?) and self
   *
   * @memberof AddFriendScreen
   */
  filterFriends = (user) => {
    return user.id !== this.props.UserStore.currentUser.id &&
      this.props.UserStore.currentUser.friends.indexOf(user.id) === -1 &&
      this.props.UserStore.friendRequests.indexOf(user.id) === -1
  }

  render () {
    return (
      this.state.loading
        ? <ActivityIndicator />
        : <View style={styles.container}>
          {/* TODO: Move to header */}
          <SearchInput
            onChangeText={this.handleSearchOnChange}
            style={styles.search}
            placeholder='Search'
          />
          <UsersList
            sections={[{
              title: 'Users',
              data: this.state.userIds,
              actions: this.actions
            }]}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {
    padding: Layout.window.hp(1.5),
    fontSize: Layout.window.hp(3)
  }
})
