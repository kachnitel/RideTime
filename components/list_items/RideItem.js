import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { RideItemDetail } from '../RideItemDetail';
import { withNavigation } from 'react-navigation';
import Layout from '../../constants/Layout';

class RideItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate({
        key: Math.random () * 10000,
        routeName: 'RideDetail',
        params: this.props.ride
      })}>
        <View style={{...styles.listItem, ...this.props.style}}>
          <Text style={{...styles.name, ...this.props.style}}>
            {this.props.ride.name}
          </Text>
          <RideItemDetail
            ride={this.props.ride}
            style={this.props.style}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

export default withNavigation(RideItem);

const styles = StyleSheet.create({
  name: {
    fontSize: Layout.window.hp(2.75),
  },
  listItem: {
    height: Layout.window.hp(15),
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4)
  }
})
