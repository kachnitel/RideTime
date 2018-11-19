import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RideItem from '../list_items/RideItem';

export class RidesList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Rides</Text>
        <FlatList
          data={this.props.rides}
          renderItem={({item}) => 
            <RideItem 
              ride={item} 
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
