import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../../constants/Colors';
import sharedStyles from './Style';
import Title from './Title';
import Layout from '../../../constants/Layout';

export default class RideCount extends Component {
  render() {
    return(
      <View style={styles.summaryItem}>
        <Title style={styles.title}>Rides</Title>
        <Text style={{...styles.count, ...styles.content}}>{this.props.count}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...sharedStyles,
  count: {
    color: Colors.iconColor,
    fontSize: Layout.window.hp(3)
  }
});
