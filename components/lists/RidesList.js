import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import RideItem from '../RideItem';

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
