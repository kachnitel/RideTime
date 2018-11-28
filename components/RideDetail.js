import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { RidersList } from '../components/lists/RidersList';
import { AreaMap } from './AreaMap';
import RideItem from './list_items/RideItem';
import Colors from '../constants/Colors';
import { MeetingPoint } from './MeetingPoint';

/**
 * Ride Detail screen content
 */
export class RideDetail extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.darkBackground}}>
        <View style={styles.map} >
          <AreaMap currentLocation={this.props.ride.locationGps} />
        </View>
        <View style={[styles.detailListItem, styles.rideItem]} >
          <RideItem ride={this.props.ride}/>
        </View>
        <View style={styles.detailListItem} >
          <RidersList riderIds={this.props.ride.members} />
        </View>
        <View style={styles.detailListItem} >
          <MeetingPoint location={this.props.ride.locationGps} />
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  map: {
    height: 200
  },
  rideItem: {
    backgroundColor: '#fff'
  },
  detailListItem: {
    padding: 15
  }
});
