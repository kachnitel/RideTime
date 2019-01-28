import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { RidersList } from '../components/lists/RidersList'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { AreaMap } from './AreaMap'
import RideItem from './list_items/RideItem'
import { RideDescription } from './RideDescription'

/**
 * Ride Detail screen content
 */
export class RideDetail extends Component {
  locationText = JSON.stringify(this.props.ride.locationGps);

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.map} >
          <AreaMap currentLocation={this.props.ride.locationGps} />
        </View>
        <View style={styles.rideItem} >
          <RideItem ride={this.props.ride} />
        </View>
        <View style={styles.detailListItem} >
          <RidersList riderIds={this.props.ride.members} navigation={this.props.navigation} />
        </View>
        <View style={styles.detailListItem} >
          {/* TODO click to show confirmation to navigate */}
          <RideDescription title='Meeting Point' text={this.locationText} />
        </View>
        <View style={styles.detailListItem} >
          {/* Could be a list with difficulty icons/colors if we obtain a trail database
          or user could insert trail name and difficulty for each */}
          <RideDescription title='Planned Route' text={this.props.ride.route} />
        </View>
        <View style={styles.detailListItem} >
          <RideDescription title='Description' text={this.props.ride.description} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  map: {
    height: Layout.window.hp(30)
  },
  rideItem: {
    backgroundColor: '#fff',
    padding: 0
  },
  detailListItem: {
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4),
    backgroundColor: Colors.darkBackground
  }
})
