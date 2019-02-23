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
  constructor (props) {
    super(props)
    this.state = {
      upcomingRide: null,
      loadingRide: true
    }
    this.ridesProvider = new RidesProvider()
  }

  async componentDidMount () {
    if (this.props.user.events.length > 0) {
      let upcomingRide = await this.ridesProvider.getRide(this.props.user.events[0].id)
      this.setState({
        upcomingRide: upcomingRide,
        loadingRide: false
      })
    }
  }

  render () {
    return (
      <ScrollView>
        <ProfileHeader user={this.props.user} />
        <FriendList friends={this.props.user.friends} style={styles.friendList} />
        <CountHeader number={this.props.user.events.length} style={styles.title}>Upcoming Rides</CountHeader>
        { !this.state.loadingRide &&
        <View style={styles.rideItemContainer}>
          <RideItem ride={this.state.upcomingRide} style={styles.rideItem} />
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
