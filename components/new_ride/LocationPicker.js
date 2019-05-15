import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import Layout from '../../constants/Layout'
import LocationList from '../lists/LocationList'
import MapButton from './MapButton'
import { inject, observer } from 'mobx-react/native'
import SearchInput from '../form/SearchInput'

export default
@inject('LocationStore')
@observer
class LocationPicker extends Component {
  state = {
    locationIds: [],
    loading: true,
    typing: false
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
    this.setState({ loading: true })
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
        <MapButton size={Layout.window.hp(15)} />
      </View>
      { this.renderList() }
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
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row'
  },
  searchInput: {
    // borderColor: '#0F0',
    borderWidth: 1,
    flex: 1,
    fontSize: Layout.window.hp(3),
    padding: Layout.window.hp(1.5)
  }
})
