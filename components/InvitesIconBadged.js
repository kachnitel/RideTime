import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { observer, inject } from 'mobx-react/native'
import CountBadge from './CountBadge'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

export default
@inject('EventStore')
@observer
class InvitesIconBadged extends Component {
  state = {
    loading: true
  }

  async componentDidMount () {
    await this.props.EventStore.loadInvites()
    this.setState({ loading: false })
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <View>
        {
          this.state.loading
            ? <ActivityIndicator size={Layout.window.hp(3)} />
            : <Icon
              name='event'
              size={Layout.window.hp(4)}
              color={Colors.tintColor}
              style={styles.icon}
            />
        }
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
