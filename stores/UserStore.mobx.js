import { observable, action, computed } from 'mobx'
import { create, persist } from 'mobx-persist'
import { AsyncStorage } from 'react-native'

class UserStore {
  // TODO: Friends, Home Locations, ...if needed
  // Likely separate store for at least friends
  // @persist('list') @observable _AnExampleArray = []
  @persist @observable _userId = false // REVIEW: immutable doesn't need @observable?
  @persist @observable _name = ''
  @persist @observable _picture = ''
  @persist @observable _email = ''
  @persist @observable _hometown = ''
  @persist @observable _level = null
  @persist @observable _bike = ''
  @persist('list') @observable _locations = []
  // TODO: phone, ...

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

  @action updateLevel (newValue) { this._level = newValue }
  @computed get level () { return this._level }

  @action updateBike (newValue) { this._bike = newValue }
  @computed get bike () { return this._bike }

  @action updateLocations (newValue: Array) { this._locations = newValue }
  @action addLocation (newValue) { this._locations.push(newValue) }
  @computed get locations () { return this._locations }

  @action updateTempPicture (newValue) { this._tempPicture = newValue }
  @computed get tempPicture () { return this._tempPicture }

  // TODO: @computed get user () { return object w/ all}

  /**
   * TODO: loop through all props and reset
   *
   * @memberof UserStore
   */
  @action reset () {
    this.updateUserId(UserStore.prototype._userId)
    this.updateName(UserStore.prototype._name)
    this.updatePicture(UserStore.prototype._picture)
    this.updateEmail(UserStore.prototype._email)
    this.updateHometown(UserStore.prototype._hometown)
    this.updateLevel(UserStore.prototype._level)
    this.updateBike(UserStore.prototype._bike)
    this.updateTempPicture(UserStore.prototype._tempPicture)
  }

  @action populateFromApiResponse (user: Object) {
    this.updateUserId(user.id)
    this.updateName(user.name)
    this.updatePicture(user.picture)
    this.updateBike(user.preferred)
    this.updateLevel(user.level)
    this.updateHometown(user.hometown)
    // this.updateEmail(user.email)
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
