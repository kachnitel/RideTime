import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

export class MeetingPoint extends Component {
  
  render() {
    locationText = JSON.stringify(this.props.location);
  
    console.log(locationText);
    return (
      <View>
        <Text style={styles.title}>Meeting Point</Text>
        {/* TODO click to show confirmation to navigate */}
        <Text style={styles.location}>{locationText}</Text>
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
