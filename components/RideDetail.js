import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { RidersList } from '../components/lists/RidersList';
import DifficultyIcon from './icons/DifficultyIcon';
import { AreaMap } from './AreaMap';

export class RideDetail extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 150}} >
          <AreaMap currentLocation={this.props.ride.locationGps} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Difficulty: </Text>
          <DifficultyIcon d={this.props.ride.difficulty} />
        </View>
        <RidersList riderIds={this.props.ride.members} />
      </View>
    );
  }
}
