import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PreferredStyle from './profile-summary/PreferredStyle';
import RideCount from './profile-summary/RideCount';
import RiderLevel from './profile-summary/RiderLevel';
import Layout from '../../constants/Layout';

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
    bottom: Layout.window.hp(2),
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
