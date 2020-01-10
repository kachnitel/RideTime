import { inject, observer } from 'mobx-react/native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Layout from '../../../constants/Layout'
import SearchInput from '../form/SearchInput'
import LocationList from './LocationList'
import AreaMap from '../location/AreaMap'
import LocationMarker from './LocationMarker'

export default
@inject('LocationStore', 'UserStore')
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

  getLocationIds () {
    return this.props.filter ? this.state.locationIds.filter(this.props.filter) : this.state.locationIds
  }

  render () {
    return <View {...this.props}>
      { this.props.displayMap ? this.renderMap() : this.renderList() }
    </View>
  }

  getListSections = () => {
    let sections = [
      {
        title: 'Nearby locations',
        data: this.props.showFavourites
          ? this.getLocationIds().filter((id) => !this.props.UserStore.currentUser.locations.includes(id))
          : this.getLocationIds()
      }
    ]

    if (this.props.showFavourites) {
      sections.unshift({
        title: 'Favourite locations',
        data: this.props.UserStore.currentUser.locations.slice()
      })
    }

    return sections
  }

  renderList = () => {
    return <>
      <View style={styles.inputRow}>
        <SearchInput
          placeholder='Type Location...'
          style={styles.searchInput}
          onChangeText={this.handleSearchOnChange}
          // autoFocus
        />
      </View>
      {
        this.state.typing
          ? <Text>Type three or more letters to search...</Text>
          : this.state.loading
            ? <ActivityIndicator />
            : <LocationList
              sections={this.getListSections()}
              onLocationPress={this.props.onLocationPress}
            />
      }
      </>
  }

  getMarkers = () => this.getLocationIds().map((id) => <LocationMarker
    location={this.props.LocationStore.get(id)}
    key={'loc_' + id}
    highlight={this.props.UserStore.currentUser.locations.includes(id)}
  />)

  renderMap = () => {
    return <AreaMap
      style={styles.map}
      onRegionChangeComplete={this.onRegionChange}
      markers={this.getMarkers()}
    />
  }

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
    let locations = await this.props.LocationStore.bbox(bbox)
    this.setState({
      locationIds: locations.map((location) => location.id)
    })
  }
}

LocationPicker.propTypes = {
  LocationStore: PropTypes.any,
  displayMap: PropTypes.bool,
  onLocationPress: PropTypes.func,
  filter: PropTypes.func,
  showFavourites: PropTypes.bool
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
