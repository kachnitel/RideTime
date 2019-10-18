import React from 'react'
import MapView, { UrlTile } from 'react-native-maps'
import { inject, observer } from 'mobx-react/native'
import { StyleSheet, ActivityIndicator } from 'react-native'

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
    let tileUrl = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
    return this.state.currentLocation
      ? <MapView
        initialRegion={{
          latitude: this.state.currentLocation.latitude,
          longitude: this.state.currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.04231
        }}
        style={styles.map}
      >
        <UrlTile urlTemplate={tileUrl} maximumZ={19} />
        {/* TODO: Own location marker */}
        {this.props.markers}
      </MapView>
      : <ActivityIndicator />
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})
