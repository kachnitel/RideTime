import React from 'react';
import { Text, View } from 'react-native';

export default class Profile extends React.Component {
  render() {
    // console.log(this.props.user.name);
    return(
      <View style={{flex: 1}}>
        <Text>{this.props.user.name}</Text>
      </View>
    );
  }
}
