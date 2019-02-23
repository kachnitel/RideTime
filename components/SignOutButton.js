import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { SecureStore } from 'expo'
import { observer, inject } from 'mobx-react'
import Button from './Button'

export default
@inject('UserStore')
@inject('ApplicationStore')
@observer
class SignOutButton extends Component {
  _signOut = () => {
    console.info(`User ${this.props.UserStore.userId} signing out`)
    Alert.alert(
      'Sign out',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.info('Sign out cancelled'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            SecureStore.deleteItemAsync('refreshToken')
            this.props.UserStore.reset()
            this.props.ApplicationStore.updateAccessToken(null)

            this.props.navigation.navigate('Auth')
          }
        }
      ],
      { onDismiss: () => console.info('Sign out cancelled') }
    )
  }

  render () {
    return (
      <Button
        title='Sign out'
        onPress={this._signOut}
      />
    )
  }
}

SignOutButton.propTypes = {
  ApplicationStore: PropTypes.any,
  UserStore: PropTypes.any,
  navigation: PropTypes.any
}
