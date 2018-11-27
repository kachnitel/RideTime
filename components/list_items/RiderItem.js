import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { ListItem } from './ListItem';

class RiderItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('PublicProfile', this.props.rider)}>
      {/* <TouchableHighlight> */}
        <View style={[
          styles.listItem,
          this.props.style
        ]}>
          {<Text style={[
            styles.name,
            this.props.style
          ]}>{this.props.rider.name}</Text>}
          {/* Rider should contain his details fetched in list */}
          {/* <RiderItemDetail ride={this.props.rider} /> */}
        </View>
      </TouchableHighlight>
    );
  }  
}

export default withNavigation(RiderItem);

styles = StyleSheet.create({
  listItem: {
    width: 100
  },
  name: {
    color: '#fff',
    textAlign: 'center'
  }
});
