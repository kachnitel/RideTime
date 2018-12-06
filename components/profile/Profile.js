import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import RidesProvider from '../../providers/RidesProvider';
import CountHeader from '../CountHeader';
import RideItem from '../list_items/RideItem';
import { FriendList } from './FriendList';
import ProfileHeader from './ProfileHeader';

export default class Profile extends React.Component {
  render() {
    upcomingRides = RidesProvider.getRides();

    return(
      <ScrollView>
        <ProfileHeader user={this.props.user} />
        <FriendList userIds={[1,2,3]} style={styles.friendList} />
        <CountHeader number={upcomingRides.length} style={styles.title}>Upcoming Rides</CountHeader>
        <View style={styles.rideItemContainer}>
          <RideItem ride={upcomingRides[0]} style={styles.rideItem}  />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  friendList: {
    paddingTop: 10,
    color: '#000'
  },
  title: {
    paddingLeft: 15,
    paddingVertical: 10
  },
  rideItemContainer: {
    borderColor: Colors.iconColor,
    borderTopWidth: 1,
    borderBottomWidth: 1
  }
})
