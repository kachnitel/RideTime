import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import InputTitle from './InputTitle'

export default class FormTextInput extends React.Component {
  render () {
    return (
      <View style={this.props.containerStyle}>
        <InputTitle>{this.props.title}</InputTitle>
        <TextInput
          {...this.props}
          style={{ ...this.props.style, ...styles.input }}
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
    width: Layout.window.wp(50)
  },
  title: {
    fontSize: Layout.window.hp(2),
    color: Colors.iconColor
  }
})
