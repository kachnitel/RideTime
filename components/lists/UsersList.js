import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AlternatingStyleList from './AlternatingStyleList'
import UserItem from '../list_items/UserItem'
import navigationService from '../../src/NavigationService'

/**
 * fixme Pretty well duplicated from RidersList
 *
 * @export
 * @class UsersList
 * @extends {Component}
 */
export default class UsersList extends Component {
  itemComponent = (id, style) => {
    return <UserItem id={id} style={style} actions={this.props.actions} />
  }

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <AlternatingStyleList
          items={this.props.users}
          emptyComponent={<Text>No frenz</Text>}
          itemComponent={this.itemComponent}
          onItemPress={(item) => navigationService.navigate('PublicProfile', { id: item })}
          keyExtractor={(item) => 'user_' + item}
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
