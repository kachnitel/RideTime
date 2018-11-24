import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import { ListItem } from './ListItem';

class RiderItem extends ListItem {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('PublicProfile', this.props.rider)}>
      {/* <TouchableHighlight> */}
        <View style={[
          this.getStyles().listItem, 
          this.props.index % 2 == 0 ? this.getStyles().listItemWhite : this.getStyles().listItemBlack
        ]}>
          {<Text style={this.getStyles().name}>{this.props.rider.name}</Text>}
          {/* Rider should contain his details fetched in list */}
          {/* <RiderItemDetail ride={this.props.rider} /> */}
        </View>
      </TouchableHighlight>
    );
  }  
}

export default withNavigation(RiderItem);
