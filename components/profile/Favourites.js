import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from '../Header';

export class Favourites extends Component {
  render() {
    return (
      <View {...this.props}>
        <Header>Favourite trails</Header>
        <Text style={styles.location}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  location: {
    paddingTop: 8,
    fontSize: 16
  }
});
