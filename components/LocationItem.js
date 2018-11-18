import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LocationItemDetail } from './LocationItemDetail';

export class LocationItem extends React.Component {
  render() {
    return <View style={styles.location}>
      <Text style={styles.name}>{this.props.location.name}</Text>
      <LocationItemDetail location={this.props.location} />
      {/* <Text style={styles.itemCoords}>{item.coords[0]}; {item.coords[1]}</Text> */}
    </View>;
  }
}

const styles = StyleSheet.create({
    name: {
      padding: 3,
      fontSize: 16,
      height: 26,
    },
    itemCoords: {
      paddingLeft: 5,
      fontSize: 10,
      height: 12,
    },
    location: {
      height: 64,
      backgroundColor: 'white',
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    }
})