import React, { Component } from 'react'
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import UsersList from '../components/lists/UsersList'
import { inject, observer } from 'mobx-react/native'
import Header from '../components/Header'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
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
      disabled: (id) => (this.props.UserStore.sentRequests.indexOf(id) !== -1)
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
        : <ScrollView style={styles.container}>
          {/* TODO: Move to header */}
          <SearchInput onChangeText={this.handleSearchOnChange} />
          <Header style={styles.header}>Users</Header>
          <UsersList
            users={this.state.userIds}
            style={styles.list}
            actions={this.actions}
          />
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  list: {},
  container: {
    flex: 1
  },
  header: {
    backgroundColor: Colors.tintColor,
    color: '#fff',
    padding: Layout.window.hp(1.5)
  }
})
