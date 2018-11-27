import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export class AlternatingStyleList extends Component {
  getStyles() {
    return styles;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    // backgroundColor: '#fff'
  },
  listItemWhite: {
    backgroundColor: '#fff',
    color: '#000'
  },
  listItemBlack: {
    backgroundColor: '#222629',
    color: '#fff'
  }
})
