import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Layout from '../../constants/Layout'

export default class LocationItem extends React.Component {
  render () {
    return (
      <View style={{ ...styles.listItem, ...this.props.style }}>
        <Text style={{ ...styles.name, ...this.props.style }}>
          {this.props.location.name}
        </Text>
        <Text>Location Details</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: Layout.window.hp(2.75)
  },
  listItem: {
    height: Layout.window.hp(15),
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4)
  }
})
