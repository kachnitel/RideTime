import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import AlternatingStyleList from '../lists/AlternatingStyleList'
import UserItem from '../user/UserItem'
import navigationService from '../../NavigationService'

/**
 * fixme Pretty well duplicated from RidersList
 *
 * @export
 * @class UsersList
 * @extends {Component}
 */
export default class UsersList extends Component {
  itemComponent = (id, style, section) => <UserItem
    id={id}
    style={style}
    actions={section.actions}
  />

  render () {
    let onItemPress = this.props.disableItemPress
      ? () => {}
      : this.props.onItemPress === undefined
        ? (item) => navigationService.navigate('PublicProfile', { id: item })
        : this.props.onItemPress
    return (
      <View style={{ ...styles.container, ...this.props.style }}>
        <AlternatingStyleList
          {...this.props}
          emptyComponent={<Text>No frenz</Text>}
          itemComponent={this.itemComponent}
          onItemPress={onItemPress}
          keyExtractor={(item) => 'user_' + item}
        />
      </View>
    )
  }
}

UsersList.propTypes = {
  ...AlternatingStyleList.propTypes,
  style: PropTypes.any,
  sections: PropTypes.arrayOf(PropTypes.shape({
    actions: PropTypes.array,
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.number)
  })),
  onItemPress: PropTypes.func,
  disableItemPress: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
