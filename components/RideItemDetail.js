import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DifficultyIcon from './icons/DifficultyIcon';

export class RideItemDetail extends React.Component {
  render() {
    const ride = this.props.ride;
    difficulty = ride.difficulty ? ride.difficulty : '0';

    return <View style={styles.detail}>
      <View style={{ paddingLeft: 5, ...styles.lowerRowItem}}>
        <DifficultyIcon size={36} d={difficulty} />
      </View>
      <View style={styles.lowerRowItem}>
        <Text>Riders: {ride.members.length}, Pace, ...</Text>
      </View>
      <View style={styles.lowerRowItem}>
        <Text>11:30</Text>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
    detail: {
      flex: 1,
      flexDirection: 'row'
    },
    lowerRowItem: {
      flex: 1,
      borderRightWidth: 1,
      borderRightColor: '#101010'
    }
})