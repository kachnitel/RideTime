import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class Header extends Component {
  render() {
    return(
      <Text {...this.props} style={{...this.props.style, ...styles.header}}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})