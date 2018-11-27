import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { RidersList } from '../components/lists/RidersList';
import { AreaMap } from './AreaMap';
import RideItem from './list_items/RideItem';

export class RideDetail extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 200}} >
          <AreaMap currentLocation={this.props.ride.locationGps} />
        </View>
        <View>
          <RideItem ride={this.props.ride} />
        </View>
        <View style={{backgroundColor: '#222629', flex: 1}}>
          {/* <Text>Difficulty: </Text> */}
          {/* <DifficultyIcon d={this.props.ride.difficulty} /> */}
          <RidersList riderIds={this.props.ride.members} />
        </View>
      </View>
    );
  }
}
