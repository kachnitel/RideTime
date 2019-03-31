import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AlternatingStyleList from './AlternatingStyleList'
import { FriendItem } from '../list_items/FriendItem'
import { inject, observer } from 'mobx-react/native'

/**
 * fixme Pretty well duplicated from RidersList
 *
 * @export
 * @class FriendList
 * @extends {Component}
 */
@inject('ApplicationStore')
@observer
export class FriendList extends Component {
  itemComponent = (fs, style) => {
    let id = fs.friendId
    let requestedByMe = this.props.ApplicationStore.userId === fs.requestedBy

    if (fs.status !== 1) {
      // pending
      let clr = requestedByMe ? 'blue' : 'red'
      style = StyleSheet.create({
        clr: { backgroundColor: clr }
      }).clr
    }
    return <FriendItem friendship={fs} style={style} />
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
