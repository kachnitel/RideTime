import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RideItem from '../list_items/RideItem'
import AlternatingStyleList from './AlternatingStyleList'

export default class RidesList extends Component {
  itemComponent = function (item, style) {
    return <RideItem ride={item} style={style} />
  }

  onItemPress = (item) => this.props.navigation.push(
    'RideDetail',
    item
  )

  render () {
    return (
      <View style={styles.container}>
        <AlternatingStyleList
          items={this.props.rides}
          itemComponent={this.itemComponent}
          emptyComponent={<Text>No rides nearby, start one!</Text>}
          onItemPress={this.onItemPress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2
  }
})
