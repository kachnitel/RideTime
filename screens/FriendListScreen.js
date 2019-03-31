import React, { Component } from 'react'
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { FriendList } from '../components/lists/FriendList'
import { inject, observer } from 'mobx-react/native'
import lodash from 'lodash'
import Header from '../components/Header'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default
@inject('UserStore', 'ApplicationStore')
@observer
class FriendListScreen extends Component {
  state = {
    friendships: [],
    invites: [],
    sent: [],
    loading: true
  }

  // TODO: Soon (TM)
  // actions = [{
  //   icon: 'mail-outline',
  //   action: () => console.log('Message ' + this.user.id)
  // }]

  actions = []

  actionsFriend = [
    ...this.actions,
    {
      icon: 'more-vert',
      action: () => console.log('Open more settings (delete, ...)')
    }
  ]

  actionsRequest = [
    ...this.actions,
    {
      icon: 'person-add',
      action: (e) => console.log('Confirm friend ', e)
    }
  ]

  async componentDidMount () {
    let signedInUserId = this.props.ApplicationStore.userId
    let user = await this.props.UserStore.get(signedInUserId)
    await this.props.UserStore.populate(user.friends.map(
      (fs) => fs.userId === signedInUserId ? fs.friendId : fs.userId
    )) // Preload all friends at once

    // Split the friends list
    let [confirmed, pending] = lodash.partition(user.friends.slice(), ({ status }) => status)
    let [sent, invites] = lodash.partition(pending, ({ requestedBy }) => requestedBy === signedInUserId)
    this.setState({
      friendships: confirmed,
      invites: invites,
      sent: sent,
      loading: false
    })
  }

  render () {
    return (
      this.state.loading
        ? <ActivityIndicator />
        : <ScrollView style={styles.container}>
          <Header style={styles.header}>Requests</Header>
          <FriendList
            friendships={this.state.invites}
            style={styles.list}
            actions={this.actionsRequest}
          />
          <Header style={styles.header}>Friends</Header>
          <FriendList
            friendships={this.state.friendships}
            style={styles.list}
            actions={this.actionsFriend}
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
