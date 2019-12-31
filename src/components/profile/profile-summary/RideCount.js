import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import Colors from '../../../../constants/Colors'
import Layout from '../../../../constants/Layout'
import SummaryItem from './SummaryItem'

export default class RideCount extends Component {
  render () {
    return (
      <SummaryItem title='Rides'>
        <Text style={styles.count}>{this.props.count}</Text>
      </SummaryItem>
    )
  }
}

const styles = StyleSheet.create({
  count: {
    color: Colors.iconColor,
    fontSize: Layout.window.hp(3.5)
  }
})
