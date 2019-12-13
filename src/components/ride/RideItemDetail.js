import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import moment from 'moment'
import DifficultyIcon from '../icons/DifficultyIcon'
import TerrainIcon from '../icons/TerrainIcon'
import RiderCount from './RiderCount'
import OutlineIcon from '../icons/OutlineIcon'
import Layout from '../../../constants/Layout'

export default class RideItemDetail extends React.Component {
  /**
   * @return string
   * @memberof RideItemDetail
   */
  getStartTimeString = () => {
    let startTime = moment(this.props.ride.datetime * 1000)

    let format = startTime.isBefore(moment().endOf('day'))
      ? 'H:mm'
      : startTime.isBefore(moment().add(7, 'days').startOf('day'))
        ? 'ddd H:mm'
        : 'ddd D/M H:mm'

    return startTime.format(format)
  }

  render () {
    let ride = this.props.ride
    let difficultyIcon = <DifficultyIcon size={Layout.window.hp(4)} d={ride.difficulty} />
    let startTime = this.getStartTimeString()

    return <View style={styles.detail}>
      <View style={styles.lowerRowIconContainer}>
        <OutlineIcon outlineStyle={styles.diffIconBg}>
          {difficultyIcon}
        </OutlineIcon>
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
        ...styles.startTimeContainer
      }}>
        <Text style={{
          ...this.props.style,
          ...styles.startTime
        }}>
          { startTime }
        </Text>
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  lowerRowIconContainer: {
    width: Layout.window.wp(12),
    alignItems: 'flex-start'
  },
  startTime: {
    fontSize: Layout.window.hp(3.25)
  },
  startTimeContainer: {
    marginLeft: 'auto',
    width: 'auto'
  },
  diffIconBg: {
    color: 'white'
  },
  riderCountStyle: {
    fontSize: Layout.window.hp(3)
  }
})
