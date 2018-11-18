import React from 'react';
import { Text } from 'react-native';

export default class RideDetailScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'That ride'
  };

  render() {
    return (
      <Text>Name: {this.props.navigation.getParam('name', 'NO NAME')}</Text>
    );
  }
}