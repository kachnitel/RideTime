import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DifficultyIcon from './icons/DifficultyIcon';
import RideCount from './profile-summary/RideCount';
import RiderLevel from './profile-summary/RiderLevel';
import PreferredStyle from './profile-summary/PreferredStyle';

export default class ProfileSummary extends Component {
  render() {
    return(
      <View style={styles.summary}>
        <RideCount count={10} />
        <RiderLevel level={2} />
        <PreferredStyle terrain='trail' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  summary: {
    height: 60,
    width: 180,
    bottom: 25,
    position: 'absolute',
    flexDirection: 'row'
  }
});
