import React, { Component } from 'react'
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import UsersList from '../components/lists/UsersList'
import { inject, observer } from 'mobx-react/native'
import Header from '../components/Header'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { User } from '../stores/UserStore.mobx'

export default
@inject('UserStore', 'ApplicationStore')
@observer
class AddFriendScreen extends Component {
  state = {
    loading: true,
    userIds: []
  }

  user: User

  actions = [
    {
      icon: 'person-add',
      action: (id) => this.requestFriend(id)
      // disable already sent requests
      // TODO:
      // disabled: (id) => (this.user.friendships.find((fs) => fs.friendId === id) !== undefined)
    }
  ]

  requestFriend = (id) => {
    this.user.addFriend(id)
  }

  async componentDidMount () {
    let signedInUserId = this.props.ApplicationStore.userId
    this.user = await this.props.UserStore.get(signedInUserId)

    // TODO: search and stuff
    await this.props.UserStore.populate()
    let users = this.props.UserStore.list()
    // Filter out existing friends
    // TODO:
    // let ids = users.filter((user) => {
    //   return user.id !== signedInUserId &&
    //     this.user.friends.indexOf(user.id) === -1 &&
    //     this.user.friendRequests.indexOf(user.id) === -1
    // }).map((user) => user.id)
    let ids = users.map((user) => user.id)

    this.setState({
      loading: false,
      userIds: ids
    })
  }

  render () {
    return (
      this.state.loading
        ? <ActivityIndicator />
        : <ScrollView style={styles.container}>
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
