/* global fetch */
import { AuthSession, SecureStore } from 'expo'
import { Alert } from 'react-native'
import {
  auth0ClientId,
  auth0Domain,
  auth0Audience,
  auth0RedirectUri
} from '../secrets'
import randomatic from 'randomatic'

/*
  TODO:
  If you use Facebook through Auth0, be sure to follow this guide: https://auth0.com/docs/connections/social/facebook
*/
export default class Authentication {
  /**
   *
   * @return Promise
   * [
   *  {
   *   "id": 71,
   *   "name": "Ondřej Váňa",
   *   "hometown": null,
   *   "events": [],
   *   "friends": [],
   *   "level": null,
   *   "preferred": null,
   *   "favourites": null,
   *   "picture": "https://lh5.googleusercontent.com/-txLCi973qWQ/AAAAAAAAAAI/AAAAAAAANuk/BpCrITncuGE/photo.jpg",
   *   "email": "vana.ondrej@gmail.com"
   *  },
   *  {
   *   "access_token":"eyJz93a...k4laUWw",
   *   "refresh_token":"GEbRxBN...edjnXbL",
   *   "id_token":"eyJ0XAi...4faeEoQ",
   *   "token_type":"Bearer",
   *   "expires_in":86400
   *  }
   * ]
   *
   * @memberof Authentication
   */
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

      return token
      // this.handleParams(token)
    }
  }

  /**
   * POST /oauth/token (JSON)
   *
   * @return Promise | token
   *
   * @memberof Authentication
   */
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

  /**
   * FIXME: unused
   * Writes access & refresh tokens to SecureStorage
   *
   * @memberof Authentication
   */
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

  /**
   * GET /userinfo (JSON)
   *
   * @return Promise | user object
   * {
   *   "email_verified": false,
   *   "email": "test.account@userinfo.com",
   *   "updated_at": "2016-12-05T15:15:40.545Z",
   *   "name": "test.account@userinfo.com",
   *   "picture": "https://s.gravatar.com/avatar/dummy.png",
   *   "user_id": "auth0|58454...",
   *   "nickname": "test.account",
   *   "created_at": "2016-12-05T11:16:59.640Z",
   *   "sub": "auth0|58454..."
   * }
   *
   * @memberof Authentication
   */
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
