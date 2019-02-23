import React, { Component } from 'react'
import { Button } from 'react-native'
import Colors from '../constants/Colors'

export default class Header extends Component {
  render () {
    return (
      <Button {...this.props} color={this.props.color || Colors.tintColor} />
    )
  }
}
