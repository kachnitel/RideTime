import React from 'react';
import { Text } from 'react-native';

export default class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'NO NAME RIDE'),
    };
  };

  render() {
    return (
      <Text>Name: {this.props.navigation.getParam('name', 'NO NAME RIDE')}</Text>
    );
  }
}