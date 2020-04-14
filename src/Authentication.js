import * as AuthSession from 'expo-auth-session'
import {
  auth0ClientId,
  auth0Domain,
  auth0Audience,
  auth0RedirectUri
} from '../secrets'
import randomatic from 'randomatic'
import { Connection } from './Connection'
import { logger } from './Logger'
import qs from 'qs'

/*
  TODO:
  If you use Facebook through Auth0, be sure to follow this guide: https://auth0.com/docs/connections/social/facebook
*/
export default class Authentication {
  constructor () {
    this.connection = new Connection(auth0Domain)
  }

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
    let redirectUrl = AuthSession.getRedirectUrl()
    let oAuthState = randomatic('Aa0', 7)
    let codeVerifier = randomatic('Aa0', 50)

    let result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize?` + qs.stringify({
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

    if (result.type === 'success') {
      if (oAuthState !== result.params.state) {
        throw new Error('OAuth state mismatch')
      }

      return this.getOAuthToken(codeVerifier, result.params.code)
    } else if (
      result.type === 'dismiss' ||
      (result.type === 'error' && result.errorCode === 'login-declined')
    ) {
      return false
    }
    logger.error('Login failed', result)
    throw new Error('Error signing in')
  }

  logoutFromAuth0 = async () => {
    let logoutUrl = AuthSession.getRedirectUrl()

    let result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/v2/logout?` + qs.stringify({
        client_id: auth0ClientId,
        returnTo: logoutUrl
      })
    })

    if (result.type !== 'success') {
      logger.error('Error logging out', result)
      return false
    }

    return true
  }

  /**
   * POST /oauth/token (JSON)
   *
   * @return Promise | token
   *
   * @memberof Authentication
   */
  getOAuthToken = (codeVerifier, code) => this.connection.post(
    'oauth/token',
    {
      grant_type: 'authorization_code',
      client_id: auth0ClientId,
      code_verifier: codeVerifier,
      code: code,
      redirect_uri: auth0RedirectUri
    }
  )

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
  refreshToken = (refreshToken) => this.connection.post(
    'oauth/token',
    {
      grant_type: 'refresh_token',
      client_id: auth0ClientId,
      refresh_token: refreshToken
    }
  )

  /**
   * GET /userinfo (JSON)
   *
   * @return Promise | user object
   *
   * @memberof Authentication
   */
  getUserInfo = (apiToken) => {
    this.connection.addHeaders({
      'Authorization': 'Bearer ' + apiToken
    })
    return this.connection.get('userinfo')
  }
}
