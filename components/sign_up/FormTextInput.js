import React from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default class FormTextInput extends React.Component {
  render () {
    return (
      <View {...this.props}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TextInput style={styles.input} value={this.props.value} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 1,
    color: Colors.tintColor,
    padding: Layout.window.hp(1),
    width: Layout.window.wp(50)
  },
  title: {
    fontSize: Layout.window.hp(2)
  }
})
