import { AuthSession } from 'expo'
import {
  auth0ClientId,
  auth0Domain,
  auth0Audience,
  auth0RedirectUri
} from '../secrets'
import randomatic from 'randomatic'
import { Connection } from './Connection'

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
    }
    console.error('Login failed', result)
    throw new Error('Error signing in')
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

    const content = await this.connection.post('oauth/token', {
      grant_type: 'authorization_code',
      client_id: auth0ClientId,
      code_verifier: codeVerifier,
      code: code,
      redirect_uri: auth0RedirectUri
    })

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

    const content = await this.connection.post(
      'oauth/token',
      {
        grant_type: 'refresh_token',
        client_id: auth0ClientId,
        refresh_token: refreshToken
      }
    )

    // console.log('Result(refresh) /oauth/token: ', content)
    return content
  }

  /**
   * GET /userinfo (JSON)
   *
   * @return Promise | user object
   *
   * @memberof Authentication
   */
  getUserInfo = async (apiToken) => {
    console.info('Getting user info')
    this.connection.addHeaders({
      'Authorization': 'Bearer ' + apiToken
    })
    let user = await this.connection.get('userinfo')

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
