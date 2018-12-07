import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from './Header';

export class RideDescription extends Component {
  render() {
    return (
      <View>
        <Header style={styles.title}>{this.props.title}</Header>
        <Text style={styles.location}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#fff'
  },
  location: {
    paddingTop: 8,
    color: '#67922e',
    fontSize: 16
  }
});
