import { observable, action, computed } from 'mobx'
import { create, persist } from 'mobx-persist'
import { AsyncStorage } from 'react-native'

class UserStore {
  // TODO: Friends, Home Locations, ...if needed
  // @persist('list') @observable _AnExampleArray = []
  @persist @observable _userId = false
  @persist @observable _name = ''
  @persist @observable _picture = ''
  @persist @observable _email = ''
  @persist @observable _hometown = ''
  // TODO: level, terrain, phone, ...
  @observable _accessToken = ''

  // Picture that hasn't been uploaded yet
  @observable _tempPicture = null

  @action updateUserId (newValue) { this._userId = newValue }
  @computed get userId () { return this._userId }

  @action updateName (newValue) { this._name = newValue }
  @computed get name () { return this._name }

  @action updatePicture (newValue) { this._picture = newValue }
  @computed get picture () { return this._picture }

  @action updateEmail (newValue) { this._email = newValue }
  @computed get email () { return this._email }

  @action updateHometown (newValue) { this._hometown = newValue }
  @computed get hometown () { return this._hometown }

  @action updateAccessToken (newValue) { this._accessToken = newValue }
  @computed get accessToken () { return this._accessToken }

  @action updateTempPicture (newValue) { this._tempPicture = newValue }
  @computed get tempPicture () { return this._tempPicture }

  // TODO: @computed get user () { return object w/ all}

  /**
   * TODO: loop through all props and reset
   *
   * @memberof UserStore
   */
  @action reset (preserveToken = false) {
    this.updateUserId(UserStore.prototype._userId)
    this.updateName(UserStore.prototype._name)
    this.updatePicture(UserStore.prototype._picture)
    this.updateEmail(UserStore.prototype._email)
    this.updateHometown(UserStore.prototype._hometown)
    this.updateTempPicture(UserStore.prototype._tempPicture)
    !preserveToken && this.updateAccessToken(UserStore.prototype._accessToken)
  }
}

/*
  We create and export a singleton (a single instance of our state).
  This allows us to use inject the same state across the app with ease.
  Some situations warrant having a new instance of state (e.g. login or sensitive state).
*/
const singleton = new UserStore()
export default singleton

const hydrate = create({
  storage: AsyncStorage, // Choose our storage medium, ensure it's imported above
  jsonify: true // if you use AsyncStorage, this needs to be true
})

// We hydrate anything we've persisted so that it is updated into the state on creation
hydrate('persistedState', singleton).then((data) => {
  console.log('Hydrated persisted data ', data)
})
