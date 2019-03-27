import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import Layout from '../../constants/Layout'
import TouchableRiderItem from '../list_items/TouchableRiderItem'
import { inject, observer } from 'mobx-react/native'
import AlternatingStyleList from './AlternatingStyleList'
import { UserItem } from '../list_items/UserItem'

/**
 * fixme Pretty well duplicated from RidersList
 *
 * @export
 * @class UsersList
 * @extends {Component}
 */
@inject('ids') @observer
export class UsersList extends Component {
  itemComponent = (item, style) => {
    return <UserItem id={item} style={style} />
  }

  render () {
    return (
      <View {...this.props} style={{...styles.container, ...this.props.style}}>
        <AlternatingStyleList
          items={this.props.ids}
          emptyComponent={<Text>No frenz</Text>}
          itemComponent={this.itemComponent}
          onItemPress={(item) => console.log(item + ' tapped')}
        />
        <Text>{this.props.ids}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
