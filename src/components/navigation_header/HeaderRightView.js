import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../../../constants/Layout'

export default class HeaderRightView extends Component {
  render () {
    return (
      <View {...this.props} style={{ ...styles.buttonContainer, ...this.props.style }}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: Layout.window.hp(1),
    paddingHorizontal: Layout.window.wp(2),
    flexDirection: 'row'
  }
})
