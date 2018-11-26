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
        <RiderCount size={30} count={ride.members.length} />
      </View>
      <View style={[
        styles.lowerRowIcon, 
        styles.duration
      ]}>
        <Text>2h</Text>
      </View>
      <View style={[styles.lowerRowIcon, {width: 'auto'}]}>
        <Text style={[this.props.style, styles.startTime]}>11:30</Text>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
    detail: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
      // alignItems: "center",
    },
    lowerRowIcon: {
      // flex: 1,
      width: 50,
      // height: 50,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 8
    },
    // detailRow: {
      // padding: 5
    // }
    startTime: {
      fontWeight: 'bold', 
      fontSize: 24
    },
    duration: {
      justifyContent: 'center', 
      borderRadius: 6, 
      backgroundColor: '#E1E1E1', 
      height: 22,
      width: 60,
      marginTop: 24,
      marginLeft: 'auto'
    }
})