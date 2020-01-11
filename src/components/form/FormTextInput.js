import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, StyleSheet } from 'react-native'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'

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

  /**
   * REVIEW: Style prop is used at first and then at last, overwriting previous logic
   *   - seems to make most sense as
   *      { ...styles.input, ...this.props.style, borderBottomColor: 'red' }
   */
  render () {
    let inputStyle = this.props.required && !this.props.value
      ? { ...this.props.style, ...styles.input, borderBottomColor: Colors.errorHighlight }
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
    borderWidth: 1,
    borderColor: Colors.transparent,
    borderBottomColor: Colors.tintColor,
    borderBottomWidth: 1,
    color: Colors.inputText,
    padding: Layout.window.hp(1),
    width: Layout.window.wp(65),
    backgroundColor: Colors.inputBackground
  },
  inputFocused: {
    borderRadius: Layout.window.hp(0.5),
    borderWidth: 1,
    borderColor: Colors.tintColor,
    backgroundColor: Colors.inputBackgroundFocused
  }
})
