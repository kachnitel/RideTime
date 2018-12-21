import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import RidersProvider from '../../providers/RidersProvider';
import Header from '../Header';
import RiderItem from '../list_items/RiderItem';

export class RidersList extends Component {
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
          renderItem={({item}) =>
            <RiderItem
              rider={item} style={styles.item}
            />
          }
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
