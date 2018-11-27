import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RiderItem from '../list_items/RiderItem';
import RidersProvider from '../../providers/RidersProvider';
import { AlternatingStyleList } from './AlternatingStyleList';

export class RidersList extends AlternatingStyleList {
  render() {
    // pull rider details here and pass further down
    // -> list -> user profile
    riders = this.props.riderIds.map((userId) => {
      return RidersProvider.getUser(userId);
    });

    return (
      <View style={this.getStyles().container}>
        <Text>Riders</Text>
        <FlatList
          data={riders}
          renderItem={({item, index}) => 
            <RiderItem 
              rider={item}
              style={index % 2 == 0 ? this.getStyles().listItemWhite : this.getStyles().listItemBlack}
            />
          }
          keyExtractor={(item, index) => "index_" + index.toString()}
        />
      </View>
    );
  }
}
