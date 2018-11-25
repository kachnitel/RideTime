import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RideItem from '../list_items/RideItem';
import { AlternatingStyleList } from './AlternatingStyleList';

export class RidesList extends AlternatingStyleList {
  render() {
    return (
      <View style={this.getStyles().container}>
        <Text>Rides nearby</Text>
        <FlatList
          data={this.props.rides}
          renderItem={({item, index}) => 
            <RideItem 
              ride={item} 
              style={index % 2 == 0 ? this.getStyles().listItemWhite : this.getStyles().listItemBlack}
            />
          }
          keyExtractor={(item, index) => "index_" + index.toString()}
        />
      </View>
    );
  }
}

