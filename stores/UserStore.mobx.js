import { observable, action, computed } from 'mobx' // REVIEW: 'mobx-react/native'
import RidersProvider from '../providers/RidersProvider'

export default class UserStore {
  provider: RidersProvider
  @observable _users = []

  constructor (userProvider: ?RidersProvider) {
    // TODO: RootStore for references
    this.provider = userProvider
  }

  @action add (newUser: User) {
    if (undefined === this._users.find(user => user.id === newUser.id)) {
      this._users.push(newUser)
    }
  }

  get = async (id) => {
    let user = this._users.find(user => user.id === id)
    if (user === undefined) {
      // Look for user at API
      user = new User(this)
      await user.populateFromApi(id)
      this.add(user)
    }

    return user
  }
}

export class User {
  userStore: UserStore
  // TODO: Friends, Home Locations, ...if needed
  // Likely separate store for at least friends
  // ID can change when creating new user
  @observable _id = false
  @observable _name = ''
  @observable _picture = ''
  @observable _email = ''
  @observable _hometown = ''
  @observable _level = null
  @observable _bike = ''
  @observable _locations = []
  // TODO: phone, ...

  // Picture that hasn't been uploaded yet
  @observable _tempPicture = null

  constructor (userStore: UserStore) {
    this.userStore = userStore
  }

  @action updateId (newValue) { this._id = newValue }
  @computed get id () { return this._id }

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
   * @memberof User
   */
  @action reset () {
    this.updateId(User.prototype._id)
    this.updateName(User.prototype._name)
    this.updatePicture(User.prototype._picture)
    this.updateEmail(User.prototype._email)
    this.updateHometown(User.prototype._hometown)
    this.updateLevel(User.prototype._level)
    this.updateBike(User.prototype._bike)
    this.updateTempPicture(User.prototype._tempPicture)
  }

  @action async populateFromApi (id: Number) {
    let user = await this.userStore.provider.getUser(id)

    this.updateId(user.id)
    this.updateName(user.name)
    this.updatePicture(user.picture)
    this.updateBike(user.preferred)
    this.updateLevel(user.level)
    this.updateHometown(user.hometown)
    this.updateLocations(user.locations || [])
    // this.updateEmail(user.email)
  }
}
