import { observable, action, computed } from 'mobx'
import { persist } from 'mobx-persist'
import RootStore from './RootStore.mobx'
import { SecureStore } from 'expo'
import Authentication from '../src/Authentication'

export default class ApplicationStore {
  constructor (rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @persist @observable _userId = null
  @observable _accessToken = null

  @action updateUserId (newValue) { this._userId = newValue }
  @computed get userId () { return this._userId }

  @action updateAccessToken (newValue) { this._accessToken = newValue }
  @computed get accessToken () { return this._accessToken }

  @action async refreshAccessToken () {
    let refreshToken = await SecureStore.getItemAsync('refreshToken')
    if (!refreshToken) {
      console.warn('Error loading refresh token!')
    }
    let auth = new Authentication()
    let token = await auth.refreshToken(refreshToken)
    if (token.error) {
      console.warn('Error refreshing API token!')
      console.log(token)
    }
    this.updateAccessToken(token.access_token)
  }

  @action reset () {
    // TODO: Reset all stores
    this.updateAccessToken(ApplicationStore.prototype._accessToken)
    this.updateUserId(ApplicationStore.prototype._userId)
  }
}
