import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RiderItem from '../list_items/RiderItem';
import RidersProvider from '../../providers/RidersProvider';

export class RidersList extends Component {
  render() {
    // pull rider details here and pass further down
    // -> list -> user profile
    riders = this.props.riderIds.map((userId) => {
      return RidersProvider.getUser(userId);
    });

    return (
      <View style={styles.container}>
        <Text>Riders</Text>
        <FlatList
          data={riders}
          renderItem={({item, index}) => 
            <RiderItem 
              rider={item}
              index={index}
            />
          }
          keyExtractor={(item, index) => "index_" + index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    padding: 3
  }
})
