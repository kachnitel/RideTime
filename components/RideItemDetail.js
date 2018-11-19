import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class RideItemDetail extends React.Component {
  render() {
    const ride = this.props.ride;
    difficulty = ride.difficulty ? ride.difficulty : '0';

    return <View style={styles.detail}>
    <View style={{flex: 1}}>
      <Text>Difficulty: {difficulty}, Pace, ...</Text>
    </View>
      <View style={{flex: 1}}>
        <Text>Riders: {ride.members.length}, Pace, ...</Text>
      </View>
      <View style={{flex: 1}}>
        <Text>11:30</Text>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
    detail: {
      flex: 1,
      flexDirection: 'row'
    }
})