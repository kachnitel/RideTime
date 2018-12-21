import React, { Component } from 'react';
import { FlatList, StyleSheet, View, TouchableHighlight } from 'react-native';
import RidersProvider from '../../providers/RidersProvider';
import Header from '../Header';
import TouchableRiderItem from '../list_items/TouchableRiderItem';

export class RidersList extends Component {
  riderItemTouchable = ({item}) => (
        <TouchableRiderItem
          rider={item}
          style={styles.item}
        />
  )

  render() {
    riders = this.props.riderIds ? this.props.riderIds.map((userId) => {
      return RidersProvider.getUser(userId);
    }) : [];

    return (
      <View>
        <Header style={styles.title}>Riders</Header>
        <FlatList
          data={riders}
          horizontal={true}
          renderItem={this.riderItemTouchable}
          keyExtractor={(item, index) => "index_" + index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#fff'
  },
  item: {
    color: '#fff'
  }
});
