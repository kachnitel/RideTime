import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { RidersList } from '../components/lists/RidersList';

export class RideDetail extends Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <Text>Difficulty: {this.props.ride.difficulty}</Text>
        <Text>Riders list</Text>
      </View>
    );
  }
}
