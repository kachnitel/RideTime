import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, Text, Platform } from 'react-native'
import Layout from '../../constants/Layout'
import LocationList from '../lists/LocationList'
import { inject, observer } from 'mobx-react/native'
import SearchInput from '../form/SearchInput'
import { MapView } from 'expo'
import { UrlTile, Marker } from 'react-native-maps'

export default
@inject('LocationStore')
@observer
class LocationPicker extends Component {
  state = {
    locationIds: [],
    loading: true,
    typing: false,
    map: false
  }

  async componentDidMount () {
    let locations = await this.props.LocationStore.nearby(25)
    this.setState({
      locationIds: locations.map((location) => location.id),
      loading: false
    })
  }

  goToRideConfig = async (locationId) => {
    let location = await this.props.LocationStore.get(locationId)

    this.props.navigation.push(
      'CreateRide',
      location
    )
  }

  /**
   * @param {String} val
   * @memberof AddFriendScreen
   */
  handleSearchOnChange = async (val) => {
    this.setState({
      loading: true,
      map: false
    })
    let locations
    if (val.length === 0) {
      locations = await this.props.LocationStore.nearby(25)
    } else if (val.length >= 3) {
      locations = await this.props.LocationStore.search(val)
    } else {
      this.setState({
        typing: true,
        loading: false
      })
      return
    }
    let ids = locations.map((location) => location.id)
    this.setState({
      locationIds: ids,
      typing: false,
      loading: false
    })
  }

  render () {
    return <View {...this.props}>
      <View style={styles.inputRow}>
        <SearchInput
          placeholder='Type Location...'
          style={styles.searchInput}
          onChangeText={this.handleSearchOnChange}
        />
      </View>
      { this.props.displayMap ? this.renderMap() : this.renderList() }
    </View>
  }

  renderList = () => {
    return this.state.loading
      ? <ActivityIndicator />
      : this.state.typing
        ? <Text>Type three or more letters to search...</Text>
        : <LocationList
          locations={this.state.locationIds}
          onLocationPress={this.goToRideConfig}
        />
  }

  renderMap = () => {
    let coords = this.props.LocationStore.currentLocation.get('coords')
    let tileUrl = 'http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
    return <MapView
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      style={styles.map}
      provider={null}
      mapType={Platform.OS === 'android' ? 'none' : 'standard'}
      onRegionChangeComplete={async (region) => {
        let bbox = [
          region.latitude - region.latitudeDelta / 2, // southLat - min lat
          region.longitude - region.longitudeDelta / 2, // westLng - min lng
          region.latitude + region.latitudeDelta / 2, // northLat - max lat
          region.longitude + region.longitudeDelta / 2 // eastLng - max lng
        ]
        let locations = await this.props.LocationStore.bbox(bbox)
        this.setState({
          locationIds: locations.map((location) => location.id)
        })
      }}
    >
      <UrlTile urlTemplate={tileUrl} maximumZ={19} />
      {this.state.locationIds.map((id) => {
        let location = this.props.LocationStore.getSync(id)
        let latlng = {
          latitude: location.coords[0],
          longitude: location.coords[1]
        }
        return <Marker
          coordinate={latlng}
          title={location.name}
          key={location.id}
          // description={marker.description}
          onCalloutPress={() => this.goToRideConfig(location.id)}
        />
      })}
    </MapView>
  }
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    fontSize: Layout.window.hp(3),
    padding: Layout.window.hp(1.5)
  },
  map: {
    flex: 1
  }
})
