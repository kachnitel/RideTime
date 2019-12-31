import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Layout from '../../../../constants/Layout'

export default class SummaryItem extends Component {
  render () {
    return <View style={styles.summaryItem}>
      <Text style={styles.title}>{this.props.title}</Text>
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
    textTransform: 'uppercase',
    fontSize: Layout.window.hp(1.5)
  },
  content: {
    height: Layout.window.hp(5),
    justifyContent: 'center',
    textAlignVertical: 'center'
  }
})
