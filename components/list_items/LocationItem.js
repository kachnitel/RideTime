import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Layout from '../../constants/Layout'
import LocationDifficulties from '../location/LocationDifficulties'
import LocationItemDetail from '../LocationItemDetail'

export default class LocationItem extends React.Component {
  render () {
    return (
      <View style={{ ...styles.listItem, ...this.props.style }}>
        <Text style={{ ...styles.name, ...this.props.style }} numberOfLines={1} >
          {this.props.location.name}
        </Text>
        <View style={styles.lowerRow}>
          <LocationDifficulties difficulties={this.props.location.difficulties} />
          <LocationItemDetail location={this.props.location} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: Layout.window.hp(2.75),
    fontWeight: 'bold',
    flex: 1
  },
  listItem: {
    height: Layout.window.hp(15),
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4)
  },
  lowerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
