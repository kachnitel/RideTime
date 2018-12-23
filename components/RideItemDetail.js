import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DifficultyIcon from './icons/DifficultyIcon';
import TerrainIcon from './icons/TerrainIcon';
import RiderCount from './RiderCount';
import OutlineIcon from './icons/OutlineIcon';
import Layout from '../constants/Layout';

export class RideItemDetail extends React.Component {
  render() {
    ride = this.props.ride;
    difficultyIcon = <DifficultyIcon size={Layout.window.hp(4)} d={ride.difficulty} style={styles.diffIcon} />;

    return <View style={styles.detail}>
      <View style={styles.lowerRowIconContainer}>
      {
        (ride.difficulty == 2 || ride.difficulty == 3)
        ?
          <OutlineIcon outlineStyle={styles.diffIconBg}>
            {difficultyIcon}
          </OutlineIcon>
        :
          difficultyIcon
      }
      </View>
      <View style={styles.lowerRowIconContainer}>
        <TerrainIcon size={Layout.window.hp(4)} terrain={ride.terrain} />
      </View>
      <View style={styles.lowerRowIconContainer}>
        <RiderCount
          size={Layout.window.hp(4)}
          fontSize={Layout.window.hp(3)}
          count={ride.members ? ride.members.length : 0}
        />
      </View>
      {/* TODO shuttle/chairlift icon */}
      <View style={{
        ...styles.lowerRowIconContainer,
        ...styles.durationContainer
      }}>
        <Text style={styles.duration}>2h</Text>
      </View>
      <View style={{
        ...styles.lowerRowIconContainer,
        ...styles.startTimeContainer
      }}>
        <Text style={{
          ...this.props.style,
          ...styles.startTime
        }}>
          11:30
        </Text>
      </View>
    </View>;
  }
}


// FIXME needs major cleanup of alignments
const styles = StyleSheet.create({
    detail: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    lowerRowIconContainer: {
      width: Layout.window.wp(12),
      // justifyContent: 'center',
      // flexDirection: 'row', // FIXME shouldn't be needed here
      alignItems: 'center',
      // borderColor: 'red',
      // borderWidth: 1,
    },
    startTime: {
      fontSize: Layout.window.hp(3.5)
    },
    startTimeContainer: {
      width: 'auto'
    },
    durationContainer: {
      justifyContent: 'center',
      borderRadius: 6,
      backgroundColor: '#E1E1E1',
      height: Layout.window.hp(3),
      width: Layout.window.wp(15),
      marginLeft: 'auto',
      marginRight: 10,
    },
    duration: {
      fontSize: Layout.window.hp(2)
    },
    diffIcon: {
      // position: 'absolute',
      // alignSelf: "center",
      // justifyContent: 'center',
      // borderColor: 'red',
      // borderWidth: 1,
    },
    diffIconBg: {
      color: 'white'
    }
})