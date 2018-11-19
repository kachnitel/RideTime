import React from 'react';
import { Text } from 'react-native';

export default class Profile extends React.Component {
  render() {
    console.log(this.props.user.name);
    return(
      <View>
        <Text>{this.props.user.name}</Text>
      </View>
    );
  }
}
