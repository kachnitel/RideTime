import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

export class RidersList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Riders list</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    padding: 3
  }
})
