import React from 'react'
import { View, Text } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import RidersList from '../components/lists/RidersList'
import UsersList from '../components/lists/UsersList'
import Colors from '../constants/Colors'

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
        <RidersList
          userIDs={this.props.UserStore.currentUser.friends}
          headerText='Riders'
        />
        <RidersList
          userIDs={this.props.UserStore.currentUser.friends}
          headerText='Riders dark'
          textColor='white'
          style={{ backgroundColor: Colors.darkBackground }}
        />
        <Text>UsersList</Text>
        <UsersList users={this.props.UserStore.currentUser.friends} />
      </View>
    )
  }
}
