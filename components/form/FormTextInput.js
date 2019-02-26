import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default class FormTextInput extends React.Component {
  render () {
    let inputStyle = this.props.required && !this.props.value
      ? { ...this.props.style, ...styles.input, borderBottomColor: 'red' }
      : { ...this.props.style, ...styles.input }
    return (
      <TextInput
        {...this.props}
        style={inputStyle}
        placeholderTextColor='#666'
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 1,
    color: '#fff',
    padding: Layout.window.hp(1),
    width: Layout.window.wp(65)
  }
})
