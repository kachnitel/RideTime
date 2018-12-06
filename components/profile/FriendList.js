// title
// friendlist using riderslist overriding style | fade out? | join icon

import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import RiderItem from '../list_items/RiderItem';
import RidersProvider from '../../providers/RidersProvider';
import Header from '../Header';

export class FriendList extends Component {
  render() {
    riders = this.props.userIds.map((userId) => {
      return RidersProvider.getUser(userId);
    });

    return (
      <View {...this.props}>
        <Header style={styles.header}>Friends</Header>
        <FlatList
          data={riders}
          horizontal={true}
          renderItem={({item}) => 
            <RiderItem 
              rider={item}
            />
          }
          keyExtractor={(item, index) => "index_" + index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 15
  }
});
