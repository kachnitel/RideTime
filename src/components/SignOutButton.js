import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { observer, inject } from 'mobx-react'
import Button from './form/Button'
import { logger } from '../Logger'
import Authentication from '../Authentication'

export default
@inject('ApplicationStore', 'UserStore', 'EventStore')
@observer
class SignOutButton extends Component {
  _signOut = () => {
    logger.debug(`User ${this.props.ApplicationStore.userId} signing out`)

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
          onPress: async () => {
            let auth = new Authentication()
            await auth.logoutFromAuth0()

            SecureStore.deleteItemAsync('refreshToken')
            this.props.ApplicationStore.reset()
            this.props.UserStore.reset()
            this.props.EventStore.reset()

            this.props.navigation.navigate('Auth')
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
