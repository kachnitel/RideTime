import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DifficultyIcon from './icons/DifficultyIcon';
import TerrainIcon from './icons/TerrainIcon';
import RiderCount from './RiderCount';

export class RideItemDetail extends React.Component {
  render() {
    const ride = this.props.ride;

    return <View style={styles.detail}>
      <View style={styles.lowerRowIcon}>
        <DifficultyIcon size={36} d={ride.difficulty} />
      </View>
      <View style={styles.lowerRowIcon}>
        <TerrainIcon size={30} terrain={ride.terrain} />
      </View>
      <View style={styles.lowerRowIcon}>
        <RiderCount count={ride.members.length} />
      </View>
      <View style={styles.lowerRowIcon}>
        <Text style={this.props.style}>11:30</Text>
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
      // backgroundColor: '#FFCCCC',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
})