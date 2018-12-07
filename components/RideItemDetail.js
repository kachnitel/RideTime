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
        {
          (ride.difficulty == 2 || ride.difficulty == 3) &&
          <DifficultyIcon 
            size={38}
            d={ride.difficulty} 
            style={{...styles.icon, ...styles.diffIconBg}} 
          /> 
        }
        <DifficultyIcon size={36} d={ride.difficulty} style={styles.diffIcon} />
      </View>
      <View style={styles.lowerRowIcon}>
        <TerrainIcon size={30} terrain={ride.terrain} />
      </View>
      <View style={styles.lowerRowIcon}>
        <RiderCount size={28} fontSize={22} count={ride.members.length} />
      </View>
      {/* TODO shuttle/chairlift icon */}
      <View style={{
        ...styles.lowerRowIcon, 
        ...styles.duration
      }}>
        <Text>2h</Text>
      </View>
      <View style={{
        ...styles.lowerRowIcon, 
        ...styles.startTimeView
      }}>
        <Text style={{...this.props.style, ...styles.startTime}}>11:30</Text>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
    detail: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    lowerRowIcon: {
      width: 46,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    startTime: {
      fontSize: 24
    },
    startTimeView: {
      width: 'auto'
    },
    duration: {
      justifyContent: 'center', 
      borderRadius: 6, 
      backgroundColor: '#E1E1E1', 
      height: 22,
      width: 60,
      marginLeft: 'auto',
      marginRight: 10,
      alignSelf: 'center'
    },
    diffIcon: {
      position: 'absolute',
      alignSelf: "center",
      justifyContent: 'center'
    },
    diffIconBg: {
      color: 'white'
    }
})