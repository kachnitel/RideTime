import React from 'react'
import { View, Text } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { RidersList } from '../components/lists/RidersList'
import { FriendList } from '../components/profile/FriendList'
import UsersList from '../components/lists/UsersList'

/**
 * TODO: Show a menu and have views for:
 * - lists
 * - list items
 * - text
 * - inputs
 * - icons
 *   - incl. outline w/ different bgs
 * - misc:
 *   - modal
 *
 */
export default
@inject('UserStore')
@observer
class DevScreen extends React.Component {
  render () {
    return (
      <View>
        <Text>RidersList</Text>
        <RidersList riders={this.props.UserStore.currentUser.friends} />
        <Text>FriendList</Text>
        <FriendList friends={this.props.UserStore.currentUser.friends} />
        <Text>UsersList</Text>
        <UsersList users={this.props.UserStore.currentUser.friends} />
      </View>
    )
  }
}
