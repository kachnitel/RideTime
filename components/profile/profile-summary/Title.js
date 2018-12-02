import React from 'react';
import { Text } from 'react-native';

export default class Title extends React.Component {
  render() {
    return(
      <Text {...this.props}>{this.props.children.toUpperCase()}</Text>
    );
  }
}