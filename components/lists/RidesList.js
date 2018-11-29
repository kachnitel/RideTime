import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import RideItem from '../list_items/RideItem';
import Colors from '../../constants/Colors'

export class RidesList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.rides}
          renderItem={({item, index}) => 
            <RideItem 
              ride={item} 
              style={index % 2 == 0 ? styles.listItemWhite : styles.listItemBlack}
            />
          }
          ListEmptyComponent={<Text>No rides nearby, start one!</Text>}
          keyExtractor={(item, index) => "index_" + index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2
  },
  listItemWhite: {
    backgroundColor: '#fff',
    color: '#000'
  },
  listItemBlack: {
    backgroundColor: Colors.darkBackground,
    color: '#fff'
  }
});
