import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

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
    backgroundColor: Colors.darkBackground,
    color: '#fff'
  }
})