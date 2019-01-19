import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import RiderCount from './RiderCount'
import Layout from '../constants/Layout'

/**
 * TODO: show activity in area etc..
 *
 * @export
 * @class LocationItemDetail
 * @extends {React.Component}
 */
export default class LocationItemDetail extends React.Component {
  render () {
    return <View style={styles.detail}>
      <RiderCount count={7} size={Layout.window.hp(5)} fontStyle={styles.riderCountFont} />
    </View>
  }
}

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    flexDirection: 'row'
  },
  riderCountFont: {
    fontSize: Layout.window.hp(4)
  }
})
