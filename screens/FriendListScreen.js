import React, { Component } from 'react'
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { FriendList } from '../components/lists/FriendList'
import { inject, observer } from 'mobx-react/native'
import Header from '../components/Header'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { User } from '../stores/UserStore.mobx'

export default
@inject('UserStore', 'ApplicationStore')
@observer
class FriendListScreen extends Component {
  state = {
    loading: true
  }
  user: User

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
    this.user = await this.props.UserStore.get(signedInUserId)
    await this.props.UserStore.populate(this.user.friends) // Preload all friends at once

    this.setState({
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
            friends={this.user.friendRequests}
            style={styles.list}
            actions={this.actionsRequest}
          />
          <Header style={styles.header}>Friends</Header>
          <FriendList
            friends={this.user.friends}
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
