import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import LocationItem from './LocationItem'
import AlternatingStyleList from '../lists/AlternatingStyleList'

export default class LocationList extends Component {
  itemComponent = function (item, style) {
    return <LocationItem locationId={item} style={style} />
  }

  render () {
    return (
      <View style={{ ...styles.container, ...this.props.style }}>
        <AlternatingStyleList
          {...this.props}
          itemComponent={this.itemComponent}
          onItemPress={this.props.onLocationPress} // FIXME: pointless
          keyExtractor={(id) => 'location_' + id}
        />
      </View>
    )
  }
}

LocationList.propTypes = {
  ...AlternatingStyleList.propTypes,
  onLocationPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
