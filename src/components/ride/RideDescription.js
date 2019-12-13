import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Header from '../Header'
import Layout from '../../../constants/Layout'

export class RideDescription extends Component {
  render () {
    return (
      <View>
        <Header style={styles.title}>{this.props.title}</Header>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#fff'
  },
  text: {
    paddingTop: Layout.window.hp(1),
    color: '#67922e',
    fontSize: Layout.window.hp(2.25)
  }
})
