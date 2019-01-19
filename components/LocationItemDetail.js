import React from 'react'
import { View, StyleSheet } from 'react-native'
import RiderCount from './RiderCount'
import Layout from '../constants/Layout'
import LocationDifficulties from './location/LocationDifficulties'

/**
 * TODO: show activity in area etc..
 *
 * @export
 * @class LocationItemDetail
 * @extends {React.Component}
 */
export default class LocationItemDetail extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <LocationDifficulties
          difficulties={this.props.location.difficulties}
          style={styles.locationDifficulties}
          iconSize={Layout.window.hp(4)} />
        <RiderCount
          count={Math.floor((Math.random() * 10) + 1)}
          size={Layout.window.hp(4)}
          fontStyle={styles.riderCountFont} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  riderCountFont: {
    fontSize: Layout.window.hp(3)
  },
  locationDifficulties: {
    flexDirection: 'row',
    backgroundColor: 'rgba(220, 220, 220, .5);',
    borderRadius: Layout.window.wp(1.5),
    padding: Layout.window.wp(1)
  }
})
