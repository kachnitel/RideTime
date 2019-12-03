import React from 'react'
import MapView, { UrlTile } from 'react-native-maps'
import { inject, observer } from 'mobx-react/native'
import { StyleSheet, ActivityIndicator } from 'react-native'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

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
    if (!this.state.currentLocation) {
      return <ActivityIndicator />
    }

    let tileUrl = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
    let latLng = {
      latitude: this.state.currentLocation.latitude,
      longitude: this.state.currentLocation.longitude
    }
    return <MapView
      initialRegion={{
        ...latLng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.04231
      }}
      style={styles.map}
      {...this.props}
    >
      <UrlTile urlTemplate={tileUrl} maximumZ={19} />
      {this.props.markers}
    </MapView>
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  selfMarkerIcon: {
    borderRadius: Layout.window.hp(1.5),
    padding: Layout.window.hp(0.5),
    backgroundColor: Colors.tintColor,
    color: '#fff',
    opacity: 0.75
  }
})
