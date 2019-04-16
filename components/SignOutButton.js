import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { SecureStore } from 'expo'
import { observer, inject } from 'mobx-react'
import Button from './Button'

export default
@inject('ApplicationStore')
@observer
class SignOutButton extends Component {
  _signOut = () => {
    console.info(`User ${this.props.ApplicationStore.userId} signing out`)
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
            this.props.navigation.navigate('Auth')

            SecureStore.deleteItemAsync('refreshToken')
            this.props.ApplicationStore.reset()
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
  navigation: PropTypes.any
}
