import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Layout from '../constants/Layout';
import LocationsProvider from '../providers/LocationsProvider';
import LocationList from './lists/LocationList';
import MapButton from './MapButton';

export default class LocationPicker extends Component {
  render() {
    return <View {...this.props}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder='Type Location...'
          style={styles.searchInput}
        />
        <MapButton size={Layout.window.hp(15)}/>
      </View>
      {/* TODO filter locations by TextInput above */}
      <LocationList locations={LocationsProvider.getLocations()} />
    </View>
  }
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
  },
  searchInput: {
    borderColor: '#0F0',
    borderWidth: 1,
    flex: 1,
    fontSize: Layout.window.hp(5),
    padding: Layout.window.hp(2),
  }
})
