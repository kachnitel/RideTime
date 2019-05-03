import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
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
    locationIds: []
  }

  async componentDidMount () {
    await this.props.LocationStore.populate()
    this.setState({
      locationIds: this.props.LocationStore.nearby().map((location) => location.id)
    })
  }

  goToRideConfig = (location) => {
    this.props.navigation.push(
      'CreateRide',
      location
    )
  }

  /**
   * @memberof AddFriendScreen
   */
  handleSearchOnChange = async (val) => {
    let locations = val === ''
      ? this.props.LocationStore.nearby()
      : await this.props.LocationStore.search(val)
    let ids = locations.map((location) => location.id)
    this.setState({ locationIds: ids })
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
      <LocationList
        locations={this.state.locationIds}
        onLocationPress={this.goToRideConfig}
      />
    </View>
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
