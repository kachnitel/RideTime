import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import InputTitle from './InputTitle'
import FormTextInput from './FormTextInput'

export default class TextInputWithTitle extends React.Component {
  render () {
    return (
      <View style={this.props.containerStyle}>
        <InputTitle>{this.props.title}</InputTitle>
        <FormTextInput
          {...this.props}
        />
      </View>
    )
  }
}

TextInputWithTitle.propTypes = {
  ...FormTextInput.propTypes,
  containerStyle: PropTypes.any,
  title: PropTypes.string
}
