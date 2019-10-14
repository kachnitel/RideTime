import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import Layout from '../constants/Layout'

export default class CountBadge extends Component {
  render () {
    return <Text style={{ ...styles.badge, ...this.props.style }}>{this.props.count}</Text>
  }
}

const styles = StyleSheet.create({
  badge: {
    textAlign: 'center',
    backgroundColor: 'red',
    paddingHorizontal: Layout.window.wp(1),
    borderRadius: Layout.window.hp(2),
    color: '#fff',
    fontWeight: 'bold'
  }
})
