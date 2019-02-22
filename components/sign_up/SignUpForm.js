import React from 'react'
import { Text } from 'react-native'

export default class SignUpForm extends React.Component {
  render () {
    return (
      <Text>{this.props.user.name}</Text>
    )
  }
}
