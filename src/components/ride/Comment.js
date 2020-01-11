import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import ProfilePicture from '../profile/ProfilePicture'
import { User } from '../../stores/UserStore.mobx'

export default
@inject('UserStore')
@observer
class Comment extends Component {
  user: User

  constructor (props) {
    super(props)
    this.user = this.props.UserStore.get(this.props.comment.author)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.user}>
          <ProfilePicture picture={this.user.picture} size={Layout.window.hp(3.5)} />
          {this.user === this.props.UserStore.currentUser
            ? <Text style={{ ...styles.userName, ...styles.self }}>You</Text>
            : <Text style={styles.userName}>{this.user.name}</Text>}
        </View>
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
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkBackgroundTransparent,
    borderRadius: Layout.window.hp(2)
  },
  userName: {
    color: Colors.tintColor,
    paddingHorizontal: Layout.window.hp(0.5),
    paddingVertical: Layout.window.hp(0.5),
    marginHorizontal: Layout.window.hp(0.25)
  },
  self: {
    color: Colors.inputPlaceholder
  },
  message: {
    color: Colors.secondaryText,
    flexWrap: 'wrap',
    flex: 1,
    height: '100%',
    textAlignVertical: 'center',
    paddingLeft: Layout.window.wp(1)
  }
})
