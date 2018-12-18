import React, { Component } from 'react';
import { TextInput, View } from 'react-native';

export default class LocationPicker extends Component {
  render() {
    return <View>
      <TextInput
        placeholder='Type Location...'
      />
    </View>
  }
}