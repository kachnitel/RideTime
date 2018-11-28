import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
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
      <View>
        <Text style={styles.title}>Riders</Text>
        <FlatList
          data={riders}
          horizontal={true}
          renderItem={({item, index}) => 
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
  title: {
    fontSize: 20,
    color: '#fff',
    paddingTop: 15,
    paddingLeft: 15,
    fontWeight: 'bold'
  }
});
