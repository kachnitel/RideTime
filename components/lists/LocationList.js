import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LocationItem from '../list_items/LocationItem';

export default class LocationList extends Component {
  render() {
    return(
      <View {...this.props}>
        <Text>Locations</Text>
        <FlatList
          data={this.props.locations}
          renderItem={({item}) =>
            <LocationItem location={item} />}
        />
      </View>
    );
  }
}
