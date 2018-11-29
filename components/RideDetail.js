import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { RidersList } from '../components/lists/RidersList';
import { AreaMap } from './AreaMap';
import RideItem from './list_items/RideItem';
import Colors from '../constants/Colors';
import { RideDescription } from './RideDescription';

/**
 * Ride Detail screen content
 */
export class RideDetail extends Component {
  locationText = JSON.stringify(this.props.ride.locationGps);

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: Colors.darkBackground}}>
        <View style={styles.map} >
          <AreaMap currentLocation={this.props.ride.locationGps} />
        </View>
        <View style={{...styles.detailListItem, ...styles.rideItem}} >
          <RideItem ride={this.props.ride}/>
        </View>
        <View style={styles.detailListItem} >
          <RidersList riderIds={this.props.ride.members} />
        </View>
        <View style={styles.detailListItem} >
          {/* TODO click to show confirmation to navigate */}
          <RideDescription title='Meeting Point' text={this.locationText} />
        </View>
        <View style={styles.detailListItem} >
          {/* Could be a list with difficulty icons/colors if we obtain a trail database
          or user could insert trail name and difficulty for each */}
          <RideDescription title='Planned Route' text={this.props.ride.plannedRoute} />
        </View>
        <View style={styles.detailListItem} >
          <RideDescription title='Description' text={this.props.ride.description} />
        </View>
      </ScrollView>
    );
  }
}

styles = StyleSheet.create({
  map: {
    height: 200
  },
  rideItem: {
    backgroundColor: '#fff',
    padding: 0
  },
  detailListItem: {
    padding: 15
  }
});
