import React, { Component } from 'react'
import { FlatList, Text, TouchableHighlight, View } from 'react-native'
import LocationItem from '../list_items/LocationItem'

export default class LocationList extends Component {
  locationItemTouchable = ({ item }) => (
    <TouchableHighlight onPress={() => this.props.onLocationPress(item)}>
      <LocationItem location={item} />
    </TouchableHighlight>
  )

  render () {
    return (
      <View {...this.props}>
        <Text>Locations</Text>
        <FlatList
          data={this.props.locations}
          renderItem={this.locationItemTouchable}
        />
      </View>
    )
  }
}
