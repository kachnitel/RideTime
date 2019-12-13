import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './Header'

export default class CountHeader extends Component {
  render () {
    return (
      <View style={{ ...styles.container, ...this.props.style }}>
        <Header style={this.props.textStyle}>{this.props.children}</Header>
        <Header style={styles.count}>{this.props.number || '0'}</Header>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  count: {
    color: '#b8b8b8',
    paddingLeft: 10
  }
})
