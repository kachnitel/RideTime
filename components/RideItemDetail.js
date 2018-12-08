import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DifficultyIcon from './icons/DifficultyIcon';
import TerrainIcon from './icons/TerrainIcon';
import RiderCount from './RiderCount';
import { OutlineIcon } from './icons/OutlineIcon';
import Layout from '../constants/Layout';

export class RideItemDetail extends React.Component {
  render() {
    ride = this.props.ride;
    difficultyIcon = <DifficultyIcon size={Layout.window.hp(4)} d={ride.difficulty} style={styles.diffIcon} />;

    return <View style={styles.detail}>
      {
        (ride.difficulty == 2 || ride.difficulty == 3)
        ?
        <OutlineIcon style={styles.lowerRowIcon} outlineStyle={styles.diffIconBg}>
          {difficultyIcon}
        </OutlineIcon>
        :
        <View style={styles.lowerRowIcon}>
          {difficultyIcon}
        </View>
      }
      <View style={styles.lowerRowIcon}>
        <TerrainIcon size={Layout.window.hp(4)} terrain={ride.terrain} />
      </View>
      <View style={styles.lowerRowIcon}>
        <RiderCount size={Layout.window.hp(4)} fontSize={Layout.window.hp(3)} count={ride.members.length} />
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
      width: Layout.window.wp(12),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    startTime: {
      fontSize: Layout.window.hp(3.5)
    },
    startTimeView: {
      width: 'auto'
    },
    duration: {
      justifyContent: 'center',
      borderRadius: 6,
      backgroundColor: '#E1E1E1',
      height: Layout.window.hp(3),
      width: Layout.window.wp(15),
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