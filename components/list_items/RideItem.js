import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { RideItemDetail } from '../RideItemDetail';
import { withNavigation } from 'react-navigation';
import { ListItem } from './ListItem';

class RideItem extends ListItem {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('RideDetail', this.props.ride)}>
        <View style={[this.props.style, this.getStyles().listItem]}>
          {/* Not a fan of 2 selectors here, but Text can't inherit from View 
          wrap in parent Text?*/}
          <Text style={[this.getStyles().name, this.props.style]}>
            {this.props.ride.name}
          </Text>
          <RideItemDetail ride={this.props.ride} style={[this.props.style, this.getStyles().detailRow]}/>
        </View>
      </TouchableHighlight>
    );
  }  
}

export default withNavigation(RideItem);
