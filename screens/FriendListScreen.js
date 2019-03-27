import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { UsersList } from '../components/lists/UsersList'
import { inject, observer } from 'mobx-react/native'

export default
@inject('UserStore', 'ApplicationStore')
@observer
class FriendListScreen extends Component {
  state = {
    ids: [],
    loading: true
  }

  async componentDidMount () {
    let user = await this.props.UserStore.get(this.props.ApplicationStore.userId)
    await this.props.UserStore.populate(user.friends) // Preload all friends at once
    this.setState({
      ids: user.friends.slice(),
      loading: false
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {!this.state.loading && <UsersList
          ids={this.state.ids}
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
