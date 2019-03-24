import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import CountHeader from '../CountHeader'
import { FriendList } from './FriendList'
import ProfileHeader from './ProfileHeader'
import { Favourites } from './Favourites'
import Layout from '../../constants/Layout'
import { observer, inject } from 'mobx-react/native'

export default
@inject('User')
@observer
class Profile extends React.Component {
  render () {
    return (
      <ScrollView>
        <ProfileHeader user={this.props.User} />
        <FriendList friends={this.props.User.friends} style={styles.friendList} />
        <CountHeader number={this.props.User.events.length} style={styles.title}>Upcoming Rides</CountHeader>
        <Favourites text={this.props.User.favourites} style={styles.title} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  friendList: {
    paddingTop: Layout.window.hp(2),
    color: '#000'
  },
  title: {
    paddingHorizontal: Layout.window.wp(4),
    paddingVertical: Layout.window.hp(2)
  },
  rideItemContainer: {
    borderColor: Colors.iconColor,
    borderTopWidth: 1,
    borderBottomWidth: 1
  }
})
