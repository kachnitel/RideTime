import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Colors from '../../constants/Colors';
import RideItem from '../list_items/RideItem';

export class RidesList extends Component {
  rideItem = ({item, index}) => { return(
    <TouchableHighlight onPress={() => this.props.navigation.push(
      'RideDetail',
      item
    )}>
      <View>
        <RideItem
          ride={item}
          style={index % 2 == 0 ? styles.listItemWhite : styles.listItemBlack}
        />
      </View>
    </TouchableHighlight>
  )}

  render() {
    return (
      <View style={styles.container}>
        {this.props.title !== undefined && this.props.title}
        <FlatList
          data={this.props.rides}
          renderItem={this.rideItem}
          ListEmptyComponent={<Text>No rides nearby, start one!</Text>}
          keyExtractor={(item, index) => "index_" + index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2
  },
  listItemWhite: {
    backgroundColor: '#fff'
  },
  listItemBlack: {
    backgroundColor: Colors.darkBackground,
    color: '#fff'
  }
});
