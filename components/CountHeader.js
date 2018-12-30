import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './Header'

export default class CountHeader extends Component {
  render () {
    return (
      <View style={{ ...styles.upcomingRidesTitleContainer, ...this.props.style }}>
        <Header>{this.props.children}</Header>
        <Header style={styles.upcomingRidesCount}>{this.props.number || '0'}</Header>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  upcomingRidesTitleContainer: {
    flexDirection: 'row'
  },
  upcomingRidesCount: {
    color: '#b8b8b8',
    paddingLeft: 10
  }
})
