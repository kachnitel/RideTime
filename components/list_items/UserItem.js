import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Layout from '../../constants/Layout'
import ProfilePicture from '../profile/ProfilePicture'
import { inject, observer } from 'mobx-react/native'
import { User } from '../../stores/UserStore.mobx'

@inject('UserStore') @observer
export class UserItem extends React.Component {
  user: User
  state = {
    loading: true
  }

  async componentDidMount () {
    this.user = await this.props.UserStore.get(this.props.id)
    this.setState({ loading: false })
  }

  render () {
    return this.state.loading
      ? <ActivityIndicator />
      : <View style={{ ...styles.container, ...this.props.style }}>
        <ProfilePicture picture={this.user.picture} size={Layout.window.hp(7)} />
        <Text style={{ ...styles.name, ...this.props.style }} numberOfLines={1} >
          {this.user.name}
        </Text>
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Layout.window.hp(12.5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Layout.window.hp(2)
  },
  name: {
    textAlign: 'center',
    paddingTop: Layout.window.hp(1),
    flex: 1
  }
})
