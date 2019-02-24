import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import InputTitle from './InputTitle'

export default class FormTextInput extends React.Component {
  render () {
    let inputStyle = this.props.required && !this.props.value
      ? { ...this.props.style, ...styles.input, borderBottomColor: 'red' }
      : { ...this.props.style, ...styles.input }
    return (
      <View style={this.props.containerStyle}>
        <InputTitle>{this.props.title}</InputTitle>
        <TextInput
          {...this.props}
          style={inputStyle}
          placeholderTextColor='#666'
        />
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
    width: Layout.window.wp(65)
  },
  title: {
    fontSize: Layout.window.hp(2),
    color: Colors.iconColor
  }
})
