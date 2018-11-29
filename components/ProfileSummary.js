import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ProfileSummary extends Component {
  render() {
    return(
      <View style={styles.summary}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  summary: {
    borderColor: 'pink',
    borderWidth: 1,
    height: 50,
    width: 180,
    bottom: 30,
    position: 'absolute'
  }
});
