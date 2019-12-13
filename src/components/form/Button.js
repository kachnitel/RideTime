import React, { Component } from 'react'
import { Button as RNButton, ButtonProps } from 'react-native'
import Colors from '../../../constants/Colors'

export default class Button extends Component {
  render () {
    return (
      <RNButton {...this.props} color={this.props.color || Colors.tintColor} />
    )
  }
}

Button.propTypes = ButtonProps
