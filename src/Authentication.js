/* global fetch */
import { AuthSession } from 'expo'
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
   * {
   *   "access_token":"eyJz93a...k4laUWw",
   *   "refresh_token":"GEbRxBN...edjnXbL",
   *   "id_token":"eyJ0XAi...4faeEoQ",
   *   "token_type":"Bearer",
   *   "expires_in":86400
   * }
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
    console.info('Getting OAuth token')
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
   * Exchange refresh_token for access_token
   *
   * POST https://YOUR_AUTH0_DOMAIN/oauth/token
   * @return Promise
   * {
   *   "access_token": "eyJ...MoQ",
   *   "expires_in": 86400,
   *   "scope": "openid offline_access",
   *   "id_token": "eyJ...0NE",
   *   "token_type": "Bearer"
   * }
   *
   * @memberof Authentication
   */
  refreshToken = async (refreshToken) => {
    console.info('Refreshing token')
    const rawResponse = await fetch(`${auth0Domain}/oauth/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: auth0ClientId,
        refresh_token: refreshToken
      })
    })
    const content = await rawResponse.json()

    // console.log('Result(refresh) /oauth/token: ', content)
    return content
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
    console.info('Getting user info')
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
