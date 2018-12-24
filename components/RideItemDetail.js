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
    difficultyIcon = <DifficultyIcon size={Layout.window.hp(4)} d={ride.difficulty} />;

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
        <TerrainIcon size={Layout.window.hp(5)} terrain={ride.terrain} />
      </View>
      <View style={styles.lowerRowIconContainer}>
        <RiderCount
          size={Layout.window.hp(4)}
          fontStyle={styles.riderCountStyle}
          count={ride.members ? ride.members.length : 0}
        />
      </View>
      {/* TODO shuttle/chairlift icon */}
      <View style={{
        ...styles.lowerRowIconContainer,
        ...styles.durationContainer
      }}>
        {/* TODO once it's optional, the startTime has to be marginLeft: auto
        with this attached to it? */}
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

const styles = StyleSheet.create({
    detail: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    lowerRowIconContainer: {
      width: Layout.window.wp(12),
      alignItems: 'center',
    },
    startTime: {
      fontSize: Layout.window.hp(3.5)
    },
    startTimeContainer: {
      width: 'auto'
    },
    durationContainer: {
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
    diffIconBg: {
      color: 'white'
    },
    riderCountStyle: {
      fontSize: Layout.window.hp(3)
    }
})
