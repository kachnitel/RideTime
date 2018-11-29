import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { RideItemDetail } from '../RideItemDetail';
import { withNavigation } from 'react-navigation';

class RideItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('RideDetail', this.props.ride)}>
        <View style={[styles.listItem, this.props.style]}>
          <Text style={[styles.name, this.props.style]}>
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
    padding: 3,
    fontSize: 20,
    height: 32,
    fontWeight: 'bold'
  },
  listItem: {
    height: 100,
    padding: 10
  }
})
