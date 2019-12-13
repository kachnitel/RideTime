import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { observer, inject } from 'mobx-react/native'
import CountBadge from './CountBadge'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default
@inject('EventStore')
@observer
class InvitesIconBadged extends Component {
  render () {
    return (
      <View>
        <MaterialIcons
          name='event'
          size={Layout.window.hp(4)}
          color={Colors.tintColor}
          style={styles.icon}
        />
        { this.props.EventStore.invites.length > 0 && <CountBadge
          count={this.props.EventStore.invites.length}
          style={styles.badge}
        /> }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: 0
  },
  icon: {
    padding: Layout.window.hp(0.75)
  }
})
