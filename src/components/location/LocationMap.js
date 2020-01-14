import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import AreaMap from './AreaMap'
import LocationMarker from './LocationMarker'
import { Location } from '../../stores/LocationStore.mobx'

export default class LocationMap extends Component {
  getMarkers = () => this.props.locations.slice().map((location: Location) => <LocationMarker
    location={location}
    key={'loc_' + location.id}
    // highlight={this.props.UserStore.currentUser.locations.includes(location.id)}
    onCalloutPress={this.props.onLocationPress}
  />)

  /**
   * REVIEW: Duplicated from RidesScreen
   *
   * @param {*} region
   * @memberof RidesScreen
   */
  onRegionChange = async (region) => {
    let bbox = [
      region.latitude - region.latitudeDelta / 2, // southLat - min lat
      region.longitude - region.longitudeDelta / 2, // westLng - min lng
      region.latitude + region.latitudeDelta / 2, // northLat - max lat
      region.longitude + region.longitudeDelta / 2 // eastLng - max lng
    ]
    this.props.onBboxUpdate(bbox)
  }

  render () {
    return (
      // FIXME: Style - use ...props
      <View style={styles.map}>
        <AreaMap
          style={styles.map}
          onRegionChangeComplete={this.onRegionChange}
          markers={this.getMarkers()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  mapActivityIndicator: {
    position: 'absolute'
  }
})
