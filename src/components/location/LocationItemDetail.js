import React from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../../../constants/Layout'
import LocationDifficulties from './LocationDifficulties'

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
          iconSize={Layout.window.hp(3.5)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  riderCountFont: {
    fontSize: Layout.window.hp(3)
  },
  locationDifficulties: {
    flexDirection: 'row',
    borderRadius: Layout.window.wp(1.5),
    padding: Layout.window.wp(0.5)
  }
})
