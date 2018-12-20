import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Layout from '../../constants/Layout';

export default class LocationItem extends React.Component {
  render() {
    console.log('ride', this.props.location);
    return (
      // <TouchableHighlight onPress={() => this.props.navigation.push(
      //   'RideDetail',
      //   this.props.ride
      // )}>
        <View style={{...styles.listItem, ...this.props.style}}>
          <Text style={{...styles.name, ...this.props.style}}>
            {this.props.location.name}
          </Text>
          <Text>Hello</Text>
        </View>
      // </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: Layout.window.hp(2.75),
  },
  listItem: {
    backgroundColor: 'red',
    borderColor: 'green',
    borderWidth: 5,
    height: Layout.window.hp(15),
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4)
  }
})
