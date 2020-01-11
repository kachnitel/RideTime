import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import LocationItem from './LocationItem'
import StyledSectionList from '../lists/StyledSectionList'

export default class LocationList extends Component {
  itemComponent = function (item) {
    return <LocationItem locationId={item} />
  }

  render () {
    return (
      <View style={{ ...styles.container, ...this.props.style }}>
        <StyledSectionList
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
  ...StyledSectionList.propTypes,
  onLocationPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
