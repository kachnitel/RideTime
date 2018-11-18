import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RideItemDetail } from './RideItemDetail';

export class RideItem extends React.Component {
  render() {
    return <View style={styles.ride}>
      <Text style={styles.name}>{this.props.ride.name}</Text>
      <RideItemDetail ride={this.props.ride} />
    </View>;
  }
}

const styles = StyleSheet.create({
    name: {
      padding: 3,
      fontSize: 16,
      height: 26,
    },
    itemCoords: {
      paddingLeft: 5,
      fontSize: 10,
      height: 12,
    },
    ride: {
      height: 64,
      backgroundColor: 'white',
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    }
})