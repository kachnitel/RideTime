import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'

export default
@inject('UserStore')
@observer
class Comment extends Component {
  state = {
    loadingUser: true,
    user: null,
    outgoing: false
  }

  componentDidMount = () => {
    this.loadUser()
  }

  loadUser = async () => {
    this.setState({ loadingUser: true })
    let user = await this.props.UserStore.getAsync(this.props.comment.author)
    this.setState({
      user: user,
      loadingUser: false,
      outgoing: user === this.props.UserStore.currentUser
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.user && (this.state.outgoing
          ? <Text style={{ ...styles.userName, ...styles.self }}>You</Text>
          : <Text style={styles.userName}>{this.state.user.name}</Text>)}
        <Text style={styles.message}>{this.props.comment.message}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Layout.window.hp(0.3)
  },
  userName: {
    color: Colors.tintColor,
    paddingHorizontal: Layout.window.hp(1),
    paddingVertical: Layout.window.hp(0.5),
    marginHorizontal: Layout.window.hp(0.25),
    backgroundColor: '#0003',
    borderRadius: Layout.window.hp(2)
  },
  self: {
    color: '#666'
  },
  message: {
    color: '#fff',
    flexWrap: 'wrap',
    flex: 1,
    height: '100%',
    textAlignVertical: 'center'
  }
})
