import React from 'react'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Alert
} from 'react-native'
import { observer, inject } from 'mobx-react'
import { SecureStore } from 'expo'
import Authentication from '../src/Authentication'
import RidersProvider from '../providers/RidersProvider'
import NetworkError from '../src/NetworkError'

export default
@inject('UserStore')
@inject('ApplicationStore')
@observer
class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let signedInUserId = this.props.UserStore.userId
    let route = null

    // Exchange refresh_token(from SecureStore) for access_token
    if (signedInUserId) {
      let refreshToken = await SecureStore.getItemAsync('refreshToken')
      let auth = new Authentication()
      let token = await auth.refreshToken(refreshToken)
      this.props.ApplicationStore.updateAccessToken(token.access_token)

      let provider = new RidersProvider()
      let user = await provider.getUser(signedInUserId)
        .catch(async (error) => {
          Alert.alert('Error loading account ID: ' + signedInUserId)
          if (error instanceof NetworkError) {
            console.warn(await error.body)
          } else {
            throw error
          }
        })

      if (user !== undefined) {
        this.props.UserStore.populateFromApiResponse(user)
        route = 'App'
      } else {
        this.props.UserStore.reset()
        route = 'Auth'
      }
    } else {
      // Ensure UserStore is clear. Less than ideal solution
      this.props.UserStore.reset()
      route = 'Auth'
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(route)
  };

  // Render any loading content that you like here
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
