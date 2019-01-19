import React from 'react'
import { View, StyleSheet } from 'react-native'
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
    return <View style={styles.container}>
      <RiderCount
        count={Math.floor((Math.random() * 10) + 1)}
        size={Layout.window.hp(4)}
        fontStyle={styles.riderCountFont} />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  riderCountFont: {
    fontSize: Layout.window.hp(3)
  }
})
