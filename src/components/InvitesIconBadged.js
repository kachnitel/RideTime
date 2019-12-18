import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { observer, inject } from 'mobx-react/native'
import CountBadge from './CountBadge'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default
@inject('EventStore')
@observer
class InvitesIconBadged extends Component {
  render () {
    let hasInvites = this.props.EventStore.invites.length > 0

    return (
      <View>
        <Icon
          name={'person-add'}
          size={Layout.window.hp(4)}
          color={Colors.tintColor}
          style={{ ...styles.icon, opacity: hasInvites ? 1 : 0.5 }}
        />
        { hasInvites && <CountBadge
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
