import PropTypes from 'prop-types'
import React from 'react'
import MapView from 'react-native-maps'
import { inject, observer } from 'mobx-react/native'
import { StyleSheet } from 'react-native'
import LocationStore from '../../stores/LocationStore.mobx'

export default
@inject('LocationStore')
@observer
class AreaMap extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentLocation: this.props.LocationStore.currentLocation.get('coords'),
      locations: []
    }
  }

  render () {
    let latLng = {
      latitude: this.state.currentLocation.latitude,
      longitude: this.state.currentLocation.longitude
    }
    return <MapView
      initialRegion={{
        ...latLng,
        latitudeDelta: 0.2,
        longitudeDelta: 0.1
      }}
      style={styles.map}
      {...this.props}
    >
      {this.props.markers}
      {this.props.polylines}
    </MapView>
  }
}

AreaMap.propTypes = {
  LocationStore: PropTypes.instanceOf(LocationStore),
  markers: PropTypes.arrayOf(PropTypes.object),
  polylines: PropTypes.arrayOf(PropTypes.object)
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})
