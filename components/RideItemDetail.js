import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DifficultyIcon from './icons/DifficultyIcon';

export class RideItemDetail extends React.Component {
  render() {
    const ride = this.props.ride;
    difficulty = ride.difficulty;

    return <View style={styles.detail}>
      <View style={styles.lowerRowIcon}>
        <DifficultyIcon size={36} d={difficulty} />
      </View>
      <View style={styles.lowerRowIcon}>
        <Text>Riders: {ride.members.length}, Pace, ...</Text>
      </View>
      <View style={styles.lowerRowIcon}>
        <Text>11:30</Text>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
    detail: {
      flex: 1,
      flexDirection: 'row',
      // alignItems: "center",
    },
    lowerRowIcon: {
      // flex: 1,
      width: 50,
      height: 50,
      // margin: 5,
      backgroundColor: '#FFCCCC',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
})