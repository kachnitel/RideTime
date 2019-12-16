import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Title from './Title'
import Layout from '../../../../constants/Layout'

export default class SummaryItem extends Component {
  render () {
    return <View style={styles.summaryItem}>
      <Title style={styles.title}>{this.props.title}</Title>
      <View style={styles.content}>
        {this.props.children}
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  summaryItem: {
    alignItems: 'center',
    width: Layout.window.wp(15),
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    textTransform: 'uppercase', // Not supported on Android as per https://github.com/facebook/react-native/issues/2088
    fontSize: Layout.window.hp(1.5)
  },
  content: {
    height: Layout.window.hp(5),
    justifyContent: 'center',
    textAlignVertical: 'center'
  }
})
