import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default class InputTitle extends React.Component {
  render () {
    return (
      <Text style={styles.title}>{this.props.children}</Text>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: Layout.window.hp(2),
    color: Colors.iconColor
  }
})
