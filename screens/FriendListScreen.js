import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { FriendList } from '../components/lists/FriendList'
import { inject, observer } from 'mobx-react/native'

export default
@inject('UserStore', 'ApplicationStore')
@observer
class FriendListScreen extends Component {
  state = {
    friendships: [],
    loading: true
  }

  async componentDidMount () {
    let signedInUserId = this.props.ApplicationStore.userId
    let user = await this.props.UserStore.get(signedInUserId)
    await this.props.UserStore.populate(user.friends.map(
      (fs) => fs.userId === signedInUserId ? fs.friendId : fs.userId
    )) // Preload all friends at once
    this.setState({
      friendships: user.friends.slice(),
      loading: false
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {!this.state.loading && <FriendList
          friendships={this.state.friendships}
          style={styles.list}
        />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {},
  container: {
    flex: 1
  }
})
