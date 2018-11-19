import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LocationItemDetail } from './LocationItemDetail';
import ListItem from './ListItem';

export class LocationItem extends ListItem {
  render() {
    return <View style={this.getStyles().listItem}>
      <Text style={this.getStyles().name}>{this.props.location.name}</Text>
      <LocationItemDetail location={this.props.location} />
      {/* <Text style={styles.itemCoords}>{item.coords[0]}; {item.coords[1]}</Text> */}
    </View>;
  }
}
