import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import PropTypes from 'prop-types'

export default class FormTextInput extends React.Component {
  render () {
    let inputStyle = this.props.required && !this.props.value
      ? { ...this.props.style, ...styles.input, borderBottomColor: 'red' }
      : { ...this.props.style, ...styles.input }
    return (
      <TextInput
        {...this.props}
        style={{ ...inputStyle, ...this.props.style }}
        placeholderTextColor='#666'
      />
    )
  }
}

FormTextInput.propTypes = {
  ...TextInput.propTypes,
  required: PropTypes.bool,
  style: PropTypes.any,
  value: PropTypes.any
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 1,
    color: '#fff',
    padding: Layout.window.hp(1),
    width: Layout.window.wp(65),
    backgroundColor: 'rgba(255,255,255,0.03);'
  }
})
