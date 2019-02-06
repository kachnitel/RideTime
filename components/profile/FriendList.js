import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Layout from '../../constants/Layout'
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
  render () {
    return (
      <View {...this.props}>
        <Header style={styles.header}>Friends</Header>
        <FlatList
          data={this.props.friends}
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
