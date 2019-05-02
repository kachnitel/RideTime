import React from 'react'
import { TextInput } from 'react-native'

export default class SearchInput extends React.Component {
  waitTime = 300
  timeout = 0

  handleInputChange = (val) => {
    clearTimeout(this.timeout) // clears the old timer
    this.timeout = setTimeout(() => this.props.onChangeText(val), this.waitTime)
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  render () {
    return <TextInput
      {...this.props}
      onChangeText={this.handleInputChange}
    />
  }
}
