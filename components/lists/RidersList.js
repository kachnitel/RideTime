import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import RidersProvider from '../../providers/RidersProvider'
import Header from '../Header'
import TouchableRiderItem from '../list_items/TouchableRiderItem'

export class RidersList extends Component {
  constructor () {
    super()
    this.state = { riders: [] }
    this.ridersProvider = new RidersProvider()
  }

  riderItemTouchable = ({ item }) => (
    <TouchableRiderItem
      rider={item}
      style={styles.item}
    />
  )

  render () {
    let riders = this.props.riderIds ? this.props.riderIds.map((user) => {
      return this.ridersProvider.getUser(user.id)
    }) : []

    return (
      <View>
        <Header style={styles.title}>Riders</Header>
        <FlatList
          data={riders}
          horizontal
          renderItem={this.riderItemTouchable}
          keyExtractor={(item, index) => 'index_' + index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#fff'
  },
  item: {
    color: '#fff'
  }
})
