import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

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
      <Text>Rides: 4 | Riders: 7</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    flexDirection: 'row'
  }
})
