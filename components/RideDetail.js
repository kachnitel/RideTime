import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { RidersList } from '../components/lists/RidersList';
import DifficultyIcon from './icons/DifficultyIcon';

export class RideDetail extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text>Difficulty: </Text>
          <DifficultyIcon d={this.props.ride.difficulty} />
        </View>
        <RidersList riderIds={this.props.ride.members} />
      </View>
    );
  }
}
