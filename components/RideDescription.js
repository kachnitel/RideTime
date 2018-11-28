import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class RideDescription extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.location}>{this.props.text}</Text>
      </View>
    );
  }
}

// TODO share between RidersList and other Ride details
// (style in constants or ind. file?)
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  location: {
    paddingTop: 8,
    color: '#67922e',
    fontSize: 16
  }
});
