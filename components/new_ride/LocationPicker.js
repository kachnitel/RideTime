import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Layout from '../../constants/Layout'
import LocationList from '../lists/LocationList'
import MapButton from './MapButton'
import { inject, observer } from 'mobx-react/native'

export default
@inject('LocationStore')
@observer
class LocationPicker extends Component {
  async componentDidMount () {
    await this.props.LocationStore.populate()
  }

  goToRideConfig = (location) => {
    this.props.navigation.push(
      'CreateRide',
      location
    )
  }

  render () {
    let locations = this.props.LocationStore.list()

    return <View {...this.props}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder='Type Location...'
          style={styles.searchInput}
        />
        <MapButton size={Layout.window.hp(15)} />
      </View>
      {/* TODO filter locations by TextInput above */}
      <LocationList
        locations={locations}
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
    borderColor: '#0F0',
    borderWidth: 1,
    flex: 1,
    fontSize: Layout.window.hp(5),
    padding: Layout.window.hp(2)
  }
})
