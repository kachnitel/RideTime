import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Layout from '../../constants/Layout';
import RidersProvider from '../../providers/RidersProvider';
import Header from '../Header';
import RiderItem from '../list_items/RiderItem';

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
    paddingLeft: Layout.window.wp(4)
  }
});
