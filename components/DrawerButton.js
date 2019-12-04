import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../constants/Colors'
import CountBadge from './CountBadge'
import stores from '../stores/CollectionStores.singleton'

export default class DrawerButton extends React.Component {
  state = {
    badgeCount: null
  }

  componentDidMount = () => {
    this.updateBadge()
    setTimeout(this.updateBadge, 5000)
  }

  updateBadge = () => {
    let count = (stores.user.friendRequests.length + stores.event.invites.length)
    this.setState({
      badgeCount: count
    })
  }

  render () {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
        <View style={styles.headerMenuIconContainer}>
          <Icon style={styles.headerMenuIcon} name='menu' />
          { this.state.badgeCount > 0 && <CountBadge
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
