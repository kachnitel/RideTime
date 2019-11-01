import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import Layout from '../constants/Layout'

export default class Header extends Component {
  render () {
    return (
      <Text {...this.props} style={{ ...this.props.style, ...styles.header }}>{this.props.children}</Text>
    )
  }
}

Header.propTypes = Text.propTypes

const styles = StyleSheet.create({
  header: {
    fontSize: Layout.window.hp(2.5),
    fontWeight: 'bold'
  }
})
