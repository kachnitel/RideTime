import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Layout from '../../constants/Layout'
import { inject, observer } from 'mobx-react/native'
import { User } from '../../stores/UserStore.mobx'
import Header from '../Header'
import ProfilePictureDecorated from '../profile/ProfilePictureDecorated';

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
        <ProfilePictureDecorated user={this.user} />
        <View style={styles.details}>
          <Header style={{ ...this.props.style, ...styles.name }} numberOfLines={1} >
            {this.user.name}
          </Header>
        </View>
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Layout.window.hp(12.5),
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.window.wp(3)
  },
  details: {
    alignItems: 'flex-start',
    flex: 1,
    height: '100%',
    paddingLeft: Layout.window.wp(3)
  },
  name: {
    //
  }
})
