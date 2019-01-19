import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Colors from '../../constants/Colors'
import RideItem from '../list_items/RideItem'

export default class RidesList extends Component {
  rideItemTouchable = ({ item, index }) => (
    <TouchableHighlight onPress={() => this.props.navigation.push(
      'RideDetail',
      item
    )}>
      <RideItem
        ride={item}
        style={index % 2 === 0 ? styles.listItemWhite : styles.listItemBlack}
      />
    </TouchableHighlight>
  )

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.rides}
          renderItem={this.rideItemTouchable}
          ListEmptyComponent={<Text>No rides nearby, start one!</Text>}
          keyExtractor={(item, index) => 'index_' + index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2
  },
  listItemWhite: {
    backgroundColor: '#fff'
  },
  listItemBlack: {
    backgroundColor: Colors.darkBackground,
    color: '#fff'
  }
})
