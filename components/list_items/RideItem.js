import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { RideItemDetail } from '../RideItemDetail';
import { withNavigation } from 'react-navigation';
import { ListItem } from './ListItem';

class RideItem extends ListItem {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('RideDetail', this.props.ride)}>
        <View style={[
          this.getStyles().listItem,
          this.props.index % 2 == 0 ? this.getStyles().listItemWhite : this.getStyles().listItemBlack
        ]}>
          {/* Not a fan of 2 selectors here, but Text can't inherit from View */}
          <Text style={[
            this.getStyles().name,
            this.props.index % 2 == 0 ? this.getStyles().listItemWhite : this.getStyles().listItemBlack
          ]}>
            {this.props.ride.name}
          </Text>
          <RideItemDetail ride={this.props.ride} style={this.getStyles().detailRow}/>
        </View>
      </TouchableHighlight>
    );
  }  
}

export default withNavigation(RideItem);
