import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import Layout from '../../../constants/Layout'

export default
@inject('UserStore')
@observer
class Comment extends Component {
  state = {
    loadingUser: true,
    user: null
  }

  componentDidMount = () => {
    this.loadUser()
  }

  loadUser = async () => {
    this.setState({ loadingUser: true })
    let user = await this.props.UserStore.get(this.props.comment.author)
    this.setState({ user: user, loadingUser: false })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.user && <Text style={styles.userName}>{this.state.user.name}</Text>}
        <Text style={styles.message}>{this.props.comment.message}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    color: '#666',
    padding: Layout.window.hp(1)
  },
  message: {
    color: '#fff'
  }
})
