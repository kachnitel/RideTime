import React, { Component } from 'react'
import { inject, observer } from 'mobx-react/native'
import { View, StyleSheet } from 'react-native'
import ProfilePicture from '../profile/ProfilePicture'
import Layout from '../../../constants/Layout'

export default
@inject('UserStore')
@observer
class RidersListCompact extends Component {
  state = {
    users: []
  }

  componentDidMount = () => {
    this.refreshUsers()
  }

  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.userIDs) !== JSON.stringify(this.props.userIDs)) {
      this.refreshUsers()
    }
  }

  refreshUsers = async () => {
    let users = await Promise.all(
      this.props.userIDs.map(async (id) => this.props.UserStore.get(id))
    )

    this.setState({
      users: users
    })
  }

  renderItem = (user, index) => {
    return <ProfilePicture
      picture={user.picture}
      size={Layout.window.hp(6)}
      style={{
        ...styles.itemContainer,
        zIndex: this.state.users.length - index
      }}
      key={'user_' + user.id}
    />
  }

  render () {
    return (
      <View style={{
        ...this.props.style,
        ...styles.container
      }}>
        {this.state.users.map(this.renderItem)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  itemContainer: {
    marginRight: -Layout.window.hp(2),
    width: Layout.window.hp(6),
    height: Layout.window.hp(6)
  }
})
