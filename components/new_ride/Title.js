import React from 'react'
import { StyleSheet, Text } from 'react-native'
import Layout from '../../constants/Layout'

export default class Title extends React.Component {
  render () {
    return <Text style={styles.textItemTitle}>{this.props.children}</Text>
  }
}

const styles = StyleSheet.create({
  textItemTitle: {
    color: '#fff',
    fontSize: Layout.window.hp(3),
    paddingBottom: Layout.window.hp(1)
  }
})
