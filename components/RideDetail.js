import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { RidersList } from '../components/lists/RidersList';

export class RideDetail extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Difficulty: {this.props.ride.difficulty}</Text>
        <RidersList riderIds={this.props.ride.members} />
      </View>
    );
  }
}
