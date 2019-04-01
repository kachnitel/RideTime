import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AlternatingStyleList from './AlternatingStyleList'
import UserItem from '../list_items/UserItem'
import { inject, observer } from 'mobx-react/native'

/**
 * fixme Pretty well duplicated from RidersList
 *
 * @export
 * @class UsersList
 * @extends {Component}
 */
export default
@inject('ApplicationStore')
@observer
class UsersList extends Component {
  itemComponent = (id, style) => {
    return <UserItem id={id} style={style} actions={this.props.actions} />
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
