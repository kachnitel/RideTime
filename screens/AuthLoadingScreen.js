import React from 'react'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import { observer, inject } from 'mobx-react'
import { SecureStore } from 'expo'
import Authentication from '../src/Authentication'

export default
@inject('UserStore')
@observer
class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // this.props.UserStore.updateUserId(false) // reset
    let signedInUserId = this.props.UserStore.userId
    let route = signedInUserId ? 'App' : 'Auth'

    // Exchange refresh_token(from SecureStore) for access_token
    if (signedInUserId) {
      let refreshToken = await SecureStore.getItemAsync('refreshToken')
      let auth = new Authentication()
      let token = await auth.refreshToken(refreshToken)
      this.props.UserStore.updateAccessToken(token.access_token)
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
