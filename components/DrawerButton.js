import React from 'react'
import { TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../constants/Colors'
import CountBadge from './CountBadge'
import { inject, observer } from 'mobx-react/native'

export default
@inject('UserStore', 'EventStore')
@observer
class DrawerButton extends React.Component {
  state = {
    badgeCount: null,
    loading: false
  }

  componentDidMount = () => {
    this.updateBadge()
  }

  updateBadge = async () => {
    this.setState({ loading: true })
    await Promise.all([
      this.props.UserStore.loadFriends(),
      this.props.EventStore.loadInvites()
    ])
    this.setState({ loading: false })
    let count = (this.props.UserStore.friendRequests.length + this.props.EventStore.invites.length)
    this.setState({
      badgeCount: count
    })
  }

  render () {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
        <View style={styles.headerMenuIconContainer}>
          <Icon style={styles.headerMenuIcon} name='menu' />
          { this.state.loading
            ? <ActivityIndicator style={styles.badge} />
            : this.state.badgeCount > 0 && <CountBadge
              count={this.state.badgeCount}
              style={styles.badge}
            /> }
        </View>
      </TouchableOpacity>
    )
  };
}

const styles = StyleSheet.create({
  headerMenuIconContainer: {
    justifyContent: 'center'
  },
  headerMenuIcon: {
    fontSize: 32,
    padding: 15,
    color: Colors.tintColor
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10
  }
})
