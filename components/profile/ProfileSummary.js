import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PreferredStyle from './profile-summary/PreferredStyle';
import RideCount from './profile-summary/RideCount';
import RiderLevel from './profile-summary/RiderLevel';

export default class ProfileSummary extends Component {
  render() {
    return(
      <View style={styles.summary}>
        <RideCount count={10} />
        { this.props.user.level !== undefined && <RiderLevel level={this.props.user.level} /> }
        { this.props.user.preferred !== undefined && <PreferredStyle terrain={this.props.user.preferred} /> }
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
    flexDirection: 'row',
    justifyContent: 'center'
  }
});