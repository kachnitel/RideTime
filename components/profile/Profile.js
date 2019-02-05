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
  constructor () {
    super()
    this.state = {
      upcomingRides: [],
      loadingRides: true
    }
    this.ridesProvider = new RidesProvider()
  }

  async componentDidMount () {
    let upcomingRides = await this.ridesProvider.getRides()
    this.setState({
      upcomingRides: upcomingRides,
      loadingRides: false
    })
  }

  render () {
    return (
      <ScrollView>
        <ProfileHeader user={this.props.user} />
        <FriendList userIds={[1, 2, 3]} style={styles.friendList} />
        <CountHeader number={this.state.upcomingRides.length} style={styles.title}>Upcoming Rides</CountHeader>
        { !this.state.loadingRides &&
        <View style={styles.rideItemContainer}>
          <RideItem ride={this.state.upcomingRides[0]} style={styles.rideItem} />
        </View>
        }
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
