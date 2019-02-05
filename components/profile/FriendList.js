import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Layout from '../../constants/Layout'
import RidersProvider from '../../providers/RidersProvider'
import Header from '../Header'
import TouchableRiderItem from '../list_items/TouchableRiderItem'

/**
 * fixme Pretty well duplicated from RidersList
 *
 * @export
 * @class FriendList
 * @extends {Component}
 */
export class FriendList extends Component {
  constructor () {
    super()
    this.state = { riders: [] }
    this.ridersProvider = new RidersProvider()
  }

  render () {
    let riders = this.props.userIds ? this.props.userIds.map((userId) => {
      return this.ridersProvider.getUser(userId)
    }) : []

    return (
      <View {...this.props}>
        <Header style={styles.header}>Friends</Header>
        <FlatList
          data={riders}
          horizontal
          renderItem={({ item }) =>
            <TouchableRiderItem
              rider={item}
            />
          }
          keyExtractor={(item, index) => 'index_' + index.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: Layout.window.wp(4)
  }
})
