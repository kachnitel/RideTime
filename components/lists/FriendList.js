import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AlternatingStyleList from './AlternatingStyleList'
import { FriendItem } from '../list_items/FriendItem'

/**
 * fixme Pretty well duplicated from RidersList
 *
 * @export
 * @class FriendList
 * @extends {Component}
 */
export class FriendList extends Component {
  itemComponent = (fs, style) => {
    let id = fs.friendId
    if (fs.status !== 1) {
      // pending
      style = StyleSheet.create({
        red: { backgroundColor: 'red' }
      }).red
    }
    return <FriendItem id={id} style={style} />
  }

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <AlternatingStyleList
          items={this.props.friendships}
          emptyComponent={<Text>No frenz</Text>}
          itemComponent={this.itemComponent}
          onItemPress={(item) => console.log(item + ' tapped')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
