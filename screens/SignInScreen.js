/* global fetch */
import { AuthSession } from 'expo'
import React from 'react'
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native'
import { auth0ClientId, auth0Domain } from '../secrets'
// import RidersProvider from '../providers/RidersProvider'
// import jwtDecoder from 'jwt-decode'

/*
  You need to swap out the Auth0 client id and domain with
  the one from your Auth0 client.

  In your Auth0 clent, you need to also add a url to your authorized redirect urls.
  For this application, I added https://auth.expo.io/@community/auth0-example because
  I am signed in as the 'community' account on Expo and the slug for this app is 'auth0-example'.
  You can open this app in the Expo client and check your logs for 'Redirect URL (add this to Auth0)'
  to see what URL to add if the above is confusing.

  If you use Facebook through Auth0, be sure to follow this guide: https://auth0.com/docs/connections/social/facebook
*/
export default class App extends React.Component {
  state = {
    username: undefined
  }

  loginWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const oAuthState = Math.random().toString(36).substring(7)
    const codeVerifier = '3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag' // FIXME: random string 43+char

    // console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`)
    const result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + this.toQueryString({
        client_id: auth0ClientId,
        response_type: 'code',
        scope: 'openid profile email offline_access', // email
        redirect_uri: redirectUrl,
        code_challenge_method: 'S256',
        code_verifier: codeVerifier,
        state: oAuthState
      })
    })

    console.log('Result:', result)
    if (result.type === 'success') {
      if (oAuthState !== result.params.state) {
        throw new Error('OAuth state mismatch')
      }

      let token = await this.getOAuthToken(codeVerifier, result.params.code)
      this.handleParams(token)
    } else {
      console.log('Result type: ', result.type)
    }
  }

  getOAuthToken = async (codeVerifier, code) => {
    const rawResponse = await fetch(`${auth0Domain}/oauth/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: auth0ClientId,
        code_verifier: codeVerifier,
        code: code,
        redirect_uri: 'https://auth.expo.io/@kachnitel/RideTime'
      })
    })
    const content = await rawResponse.json()

    console.log('Token: ', content)
    return content
  }

  handleParams = async (responseObj) => {
    if (responseObj.error) {
      Alert.alert('Error', responseObj.error_description ||
      'something went wrong while logging in')
      return
    }

    const {
      id_token: idToken,
      access_token: accessToken,
      refresh_token: refreshToken
    } = responseObj

    console.log(idToken)

    // TODO:
    // idToken stored in state

    // const decodedToken = jwtDecoder(idToken)
    // const username = decodedToken.name
    // console.log('Decoded token:', decodedToken)
    // this.setState({ username })
    // await AsyncStorage.setItem('userToken', 'abc')
    // let provider = new RidersProvider(idToken)
    // // TODO:
    // provider.signIn()
    //   .then((result) => {
    //     console.log('signin result', result)
    //     // this.setState({ user: result })
    //   })
    // await AsyncStorage.setItem('signedInUserId', '1') // Use SecureStorage?
    // this.props.navigation.navigate('App')
  }

  /**
   * Converts an object to a query string.
   */
  toQueryString (params) {
    return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }

  render () {
    return (
      <View style={styles.container}>
        {this.state.username !== undefined
          ? <Text style={styles.title}>Hi {this.state.username}!</Text>
          : <View>
            <Text style={styles.title}>Example: Auth0 login</Text>
            <Button title='Login with Auth0' onPress={this.loginWithAuth0} />
          </View>
        }
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
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40
  }
})
