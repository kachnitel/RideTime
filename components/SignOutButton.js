import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { observer, inject } from 'mobx-react'
import Button from './Button'
import { logger } from '../src/Logger'

export default
@inject('ApplicationStore')
@observer
class SignOutButton extends Component {
  _signOut = () => {
    logger.info(`User ${this.props.ApplicationStore.userId} signing out`)
    Alert.alert(
      'Sign out',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => logger.info('Sign out cancelled'),
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
      { onDismiss: () => logger.info('Sign out cancelled') }
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
