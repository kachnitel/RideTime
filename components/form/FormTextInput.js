import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import PropTypes from 'prop-types'

export default class FormTextInput extends React.Component {
  state = {
    focused: false
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  onBlur = () => {
    this.setState({ focused: false })
  }

  render () {
    let inputStyle = this.props.required && !this.props.value
      ? { ...this.props.style, ...styles.input, borderBottomColor: 'red' }
      : { ...this.props.style, ...styles.input }

    if (this.state.focused) {
      inputStyle = {
        ...inputStyle,
        ...styles.inputFocused
      }
    }
    return (
      <TextInput
        {...this.props}
        style={{ ...inputStyle, ...this.props.style }}
        placeholderTextColor='#666'
        onFocus={this.onFocus}
        onBlur={this.onBlur}
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
    fontSize: Layout.window.hp(2.5),
    borderColor: Colors.tintColor,
    borderBottomWidth: 1,
    color: '#fff',
    padding: Layout.window.hp(1),
    width: Layout.window.wp(65),
    backgroundColor: 'rgba(255,255,255,0.03);'
  },
  inputFocused: {
    borderRadius: Layout.window.hp(0.5),
    borderWidth: 1,
    backgroundColor: '#fff2'
  }
})
