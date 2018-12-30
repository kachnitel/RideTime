import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Colors from '../../constants/Colors'
import RidesProvider from '../../providers/RidesProvider'
import CountHeader from '../CountHeader'
import RideItem from '../list_items/RideItem'
import { FriendList } from './FriendList'
import ProfileHeader from './ProfileHeader'
import { Favourites } from './Favourites'
import Layout from '../../constants/Layout'

export default class Profile extends React.Component {
  render () {
    let upcomingRides = RidesProvider.getRides()

    return (
      <ScrollView>
        <ProfileHeader user={this.props.user} />
        <FriendList userIds={[1, 2, 3]} style={styles.friendList} />
        <CountHeader number={upcomingRides.length} style={styles.title}>Upcoming Rides</CountHeader>
        <View style={styles.rideItemContainer}>
          <RideItem ride={upcomingRides[0]} style={styles.rideItem} />
        </View>
        <Favourites text={this.props.user.favourites} style={styles.title} />
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
