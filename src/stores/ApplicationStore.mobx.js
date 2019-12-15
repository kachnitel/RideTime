import { observable, action, computed } from 'mobx'
import { persist } from 'mobx-persist'
import * as SecureStore from 'expo-secure-store'
import Authentication from '../Authentication'
import { logger } from '../Logger'

export default class ApplicationStore {
  @persist @observable _userId = null
  @observable _accessToken = null

  @action updateUserId (newValue) { this._userId = newValue }
  @computed get userId () { return this._userId }

  @action updateAccessToken (newValue) { this._accessToken = newValue }
  @computed get accessToken () { return this._accessToken }

  @action async refreshAccessToken () {
    let refreshToken = await SecureStore.getItemAsync('refreshToken')
    if (!refreshToken) {
      logger.warn('Error loading refresh token!')
    }
    let auth = new Authentication()
    let token = await auth.refreshToken(refreshToken)
    if (token.error) {
      logger.warn('Error refreshing API token!')
      logger.info(token)
    }
    this.updateAccessToken(token.access_token)
  }

  @action reset () {
    // TODO: Reset all stores
    this.updateAccessToken(ApplicationStore.prototype._accessToken)
    this.updateUserId(ApplicationStore.prototype._userId)
  }
}
