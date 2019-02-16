/* global fetch */
import { AuthSession, SecureStore } from 'expo'
import { Alert } from 'react-native'
import {
  auth0ClientId,
  auth0Domain,
  auth0Audience,
  auth0RedirectUri
} from '../secrets'
import RidersProvider from '../providers/RidersProvider'
import randomatic from 'randomatic'

/*
  TODO:
  If you use Facebook through Auth0, be sure to follow this guide: https://auth0.com/docs/connections/social/facebook
*/
export default class Authentication {
  loginWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const oAuthState = randomatic('Aa0', 7)
    const codeVerifier = randomatic('Aa0', 50)

    // console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`)
    const result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + this.toQueryString({
        client_id: auth0ClientId,
        response_type: 'code',
        scope: 'openid profile email offline_access',
        redirect_uri: redirectUrl,
        code_challenge_method: 'S256',
        code_verifier: codeVerifier,
        state: oAuthState,
        audience: auth0Audience
      })
    })

    // console.log('Result /authorize:', result)
    if (result.type === 'success') {
      if (oAuthState !== result.params.state) {
        throw new Error('OAuth state mismatch')
      }

      let token = await this.getOAuthToken(codeVerifier, result.params.code)
      this.handleParams(token)
      let userInfo = await this.getUserInfo(token.access_token)

      // console.log(token, userInfo)
      // TODO:
      // fetch user UPSERT to DB;
      let provider = new RidersProvider(token.access_token)
      provider.signIn(userInfo)
        .then((result) => {
          console.log('API signin result', result)
          // this.setState({ user: result })
        })

      // fetch updated user (result above) from DB and store in RN AsyncStorage & "global" state
      // await AsyncStorage.setItem('signedInUserId', '1') // Use SecureStorage?
      // this.props.navigation.navigate('App')
    } else {
      console.log('Auth0 login Result type: ', result.type)
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
        redirect_uri: auth0RedirectUri
      })
    })
    const content = await rawResponse.json()

    // console.log('Result /oauth/token: ', content)
    return content
  }

  handleParams = async (responseObj) => {
    if (responseObj.error) {
      Alert.alert('Error', responseObj.error_description ||
      'something went wrong while logging in')
      return
    }

    const {
      // id_token: idToken,
      access_token: accessToken,
      refresh_token: refreshToken
    } = responseObj

    SecureStore.setItemAsync('access_token', accessToken)
    SecureStore.setItemAsync('refresh_token', refreshToken)
  }

  getUserInfo = async (apiToken) => {
    let response = await fetch(`${auth0Domain}/userinfo`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiToken
      }
    })
    let user = await response.json()

    return user
  }

  /**
   * Converts an object to a query string.
   */
  toQueryString (params) {
    return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }
}
