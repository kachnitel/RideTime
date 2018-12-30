import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Header from '../Header'
import Layout from '../../constants/Layout'

export class Favourites extends Component {
  render () {
    return (
      <View {...this.props}>
        <Header>Favourite trails</Header>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    paddingTop: Layout.window.hp(1),
    fontSize: Layout.window.hp(2.25)
  }
})
