import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DifficultyIcon from '../icons/DifficultyIcon'
import TerrainIcon from '../icons/TerrainIcon'
import RiderCount from './RiderCount'
import OutlineIcon from '../icons/OutlineIcon'
import Layout from '../../../constants/Layout'

export default
@observer
class RideItemDetail extends React.Component {
  /**
   * @return string
   * @memberof RideItemDetail
   */
  getStartTimeString = () => {
    // show date on past events, add relative strings: tomorrow, yesterday
    let startTime = this.getStartTime()

    return startTime.calendar(null, {
      sameDay: '[Today at] H:mm',
      nextDay: '[Tomorrow at] H:mm',
      nextWeek: 'dddd [at] H:mm',
      lastDay: '[Yesterday] H:mm',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YY H:mm'
    })
  }

  /**
   * Returns moment initialized with current timestamp
   * @returns {moment}
   */
  getStartTime = () => moment(this.props.ride.datetime * 1000)

  /**
   * TODO: Use CountIcon, move font size there
   */
  messageCount = () => this.props.ride.comments.length > 0 && <View style={styles.messageCount}>
    <Text style={{ ...styles.messageCountText, ...this.props.style }}>
      {this.props.ride.comments.length}
    </Text>
    <Icon
      size={Layout.window.hp(4)}
      name='comment'
      style={{ ...styles.messageCountIcon, ...this.props.style }}
    />
  </View>

  render () {
    let ride = this.props.ride
    let difficultyIcon = <DifficultyIcon size={Layout.window.hp(4)} d={ride.difficulty} />
    let startTime = this.getStartTimeString()

    return <View style={styles.detail}>
      <View style={styles.iconContainer}>
        <OutlineIcon outlineStyle={styles.diffIconBg}>
          {difficultyIcon}
        </OutlineIcon>
      </View>
      <View style={styles.iconContainer}>
        <TerrainIcon size={Layout.window.hp(5)} terrain={ride.terrain} />
      </View>
      <View style={styles.iconContainer}>
        <RiderCount
          size={Layout.window.hp(4)}
          fontStyle={styles.riderCountStyle}
          count={ride.members ? ride.members.length : 0}
        />
      </View>
      <View style={styles.iconContainer}>
        {this.messageCount()}
      </View>
      {/* TODO shuttle/chairlift icon */}
      <View style={{
        opacity: this.getStartTime().isBefore(moment()) ? 0.3 : 1,
        ...styles.iconContainer,
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
  iconContainer: {
    width: Layout.window.wp(12),
    alignItems: 'flex-start'
  },
  startTime: {
    fontSize: Layout.window.hp(2.5)
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
  },
  messageCount: {
    flexDirection: 'row',
    textAlignVertical: 'center'
  },
  messageCountText: {
    fontWeight: 'bold',
    fontSize: Layout.window.hp(3),
    paddingRight: 2,
    opacity: 0.7
  },
  messageCountIcon: {
    opacity: 0.7
  }
})
