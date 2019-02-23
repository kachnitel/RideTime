import React from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default class FormTextInput extends React.Component {
  render () {
    return (
      <View style={this.props.containerStyle}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TextInput {...this.props} style={{ ...this.props.style, ...styles.input }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 1,
    color: '#fff',
    padding: Layout.window.hp(1),
    width: Layout.window.wp(50)
  },
  title: {
    fontSize: Layout.window.hp(2),
    color: Colors.iconColor
  }
})
