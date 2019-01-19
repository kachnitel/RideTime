import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import LocationItem from '../list_items/LocationItem'
import PropTypes from 'prop-types'
import AlternatingStyleList from './AlternatingStyleList'

export default class LocationList extends Component {
  itemComponent = function (item, style) {
    return <LocationItem location={item} style={style} />
  }

  onItemPress = (item) => this.props.onLocationPress(item)

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <Text>Locations</Text>
        <AlternatingStyleList
          items={this.props.locations}
          itemComponent={this.itemComponent}
          onItemPress={this.onItemPress}
        />
      </View>
    )
  }
}

LocationList.propTypes = {
  locations: PropTypes.array,
  onLocationPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
