import React, { Component } from 'react'
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import UsersList from '../components/lists/UsersList'
import { inject, observer } from 'mobx-react/native'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import Button from '../components/Button'
import CountHeader from '../components/CountHeader'

export default
@inject('UserStore', 'ApplicationStore')
@observer
class FriendListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // w/ little name under in drawer eventually
      title: 'Friends',
      headerRight: (
        <Button
          title='Add'
          onPress={() => navigation.push('AddFriend')}
        />
      )
    }
  }

  state = {
    loading: true
  }

  // TODO: Soon (TM)
  // actions = [{
  //   icon: 'mail-outline',
  //   action: () => console.log('Message ' + this.props.UserStore.currentUser.id)
  // }]

  actionsFriend = [
    {
      icon: 'more-vert',
      action: () => console.log('Open more settings (delete, ...)')
    }
  ]

  actionsRequest = [
    {
      icon: 'person-add',
      action: (id) => this.props.UserStore.acceptFriendRequest(id)
    },
    {
      icon: 'block',
      action: (id) => this.props.UserStore.removeFriendRequest(id)
    }
  ]

  async componentDidMount () {
    await this.props.UserStore.populate([
      ...this.props.UserStore.currentUser.friends,
      ...this.props.UserStore.friendRequests
    ]) // Preload all friends at once

    this.setState({
      loading: false
    })
  }

  render () {
    return (
      this.state.loading
        ? <ActivityIndicator />
        : <ScrollView style={styles.container}>
          {this.props.UserStore.friendRequests.length > 0 && <>
            <CountHeader
              number={this.props.UserStore.friendRequests.length}
              style={styles.header}
              textStyle={styles.headerText}
            >
              Requests
            </CountHeader>
            <UsersList
              users={this.props.UserStore.friendRequests}
              style={styles.list}
              actions={this.actionsRequest}
            />
          </>}
          <CountHeader
            number={this.props.UserStore.currentUser.friends.length}
            style={styles.header}
            textStyle={styles.headerText}
          >
            Friends
          </CountHeader>
          <UsersList
            users={this.props.UserStore.currentUser.friends}
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
    padding: Layout.window.hp(1.5)
  },
  headerText: {
    color: '#fff'
  }
})
