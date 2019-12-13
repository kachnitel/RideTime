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

UsersList.propTypes = {
  actions: PropTypes.array,
  style: PropTypes.any,
  users: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})