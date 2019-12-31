import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default class CountBadge extends Component {
  render () {
    return <Text style={{ ...styles.badge, ...this.props.style }}>{this.props.count}</Text>
  }
}

CountBadge.propTypes = {
  count: PropTypes.number,
  style: PropTypes.any
}

const styles = StyleSheet.create({
  badge: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.confirmationHighlight,
    paddingHorizontal: Layout.window.wp(1),
    borderRadius: Layout.window.hp(2),
    fontWeight: 'bold',
    minWidth: Layout.window.wp(5)
  }
})
