import { observable, action, computed, autorun } from 'mobx'
import { persist } from 'mobx-persist'
// import { SecureStore } from 'expo'
// import Authentication from '../src/Authentication'
import { RootStore } from './RootStore'

export default class ApplicationStore {
  constructor (rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @persist @observable _userId = null
  @observable _accessToken = null

  // @computed get signedInUser () { return this.rootStore.userStore.get(this._userId) }

  @action updateUserID (newValue) {
    this._userId = newValue
    // Side effect (@reaction? refreshUser)
  }
  @computed get userId () { return this._userId }

  @action updateAccessToken (newValue) { this._accessToken = newValue }
  @computed get accessToken () { return this._accessToken }

  disposer = autorun(() => console.log('AppStore::autorun', this.accessToken))

  // @action async refreshAccessToken () {
  //   let refreshToken = await SecureStore.getItemAsync('refreshToken')
  //   if (!refreshToken) {
  //     console.warn('Error loading refresh token!')
  //   }
  //   let auth = new Authentication()
  //   let token = await auth.refreshToken(refreshToken)
  //   if (token.error) {
  //     console.warn('Error refreshing API token!')
  //     console.log(token)
  //   }
  //   this.updateAccessToken(token.access_token)
  // }

  @action reset () {
    // TODO: Reset all stores
    this.updateAccessToken(ApplicationStore.prototype._accessToken)
    this.updateUserID(ApplicationStore.prototype._userId)
  }
}
