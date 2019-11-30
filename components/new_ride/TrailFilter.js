import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DifficultyRangeSlider from './DifficultyRangeSlider'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'

export default class TrailFilter extends Component {
  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <DifficultyRangeSlider width={Layout.window.wp(55)} />
        <Text> TODO: Search </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBackground
  }
})
