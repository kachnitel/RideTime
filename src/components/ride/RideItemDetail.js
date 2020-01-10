import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import moment from 'moment'
import DifficultyIcon from '../icons/DifficultyIcon'
import TerrainIcon from '../icons/TerrainIcon'
import Layout from '../../../constants/Layout'
import CountIcon from '../icons/CountIcon'

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

  messageCount = () => this.props.ride.comments.length > 0 && <CountIcon
    name='chat-bubble-outline'
    size={Layout.window.hp(5)}
    color={'#aaa'}
    count={this.props.ride.comments.length}
  />

  memberCount = () => <CountIcon
    name='person-outline'
    size={Layout.window.hp(5)}
    color={'#878787'}
  />

  render () {
    let ride = this.props.ride
    let startTime = this.getStartTimeString()

    return <View style={styles.detail}>
      <View style={styles.iconContainer}>
        <DifficultyIcon size={Layout.window.hp(4)} d={ride.difficulty} />
      </View>
      <View style={styles.iconContainer}>
        <TerrainIcon size={Layout.window.hp(5)} terrain={ride.terrain} />
      </View>
      <View style={styles.iconContainer}>
        {this.memberCount()}
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
    // width: Layout.window.wp(12),
    paddingHorizontal: Layout.window.wp(0.5),
    alignItems: 'flex-start'
  },
  startTime: {
    fontSize: Layout.window.hp(2),
    color: '#888'
  },
  startTimeContainer: {
    marginLeft: 'auto',
    width: 'auto'
  }
})
