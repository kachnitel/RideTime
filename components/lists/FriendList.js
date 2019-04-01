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
  itemComponent = (id, style) => {
    return <FriendItem id={id} style={style} actions={this.props.actions} />
  }

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <AlternatingStyleList
          items={this.props.friends}
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
