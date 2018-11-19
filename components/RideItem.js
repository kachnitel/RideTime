import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { RideItemDetail } from './RideItemDetail';
import { withNavigation } from 'react-navigation';
import { ListItem } from './ListItem';

class RideItem extends ListItem {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('RideDetail', this.props.ride)}>
        <View style={this.getStyles().listItem}>
          <Text style={this.getStyles().name}>{this.props.ride.name}</Text>
          <RideItemDetail ride={this.props.ride} />
        </View>
      </TouchableHighlight>
    );
  }  
}

export default withNavigation(RideItem);
