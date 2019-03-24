import { observable, action, computed } from 'mobx'
import RidersProvider from '../providers/RidersProvider'
import { BaseEntity } from './BaseEntity'

export default class UserStore {
  provider: RidersProvider
  @observable _users = []

  constructor (userProvider: ?RidersProvider) {
    this.provider = userProvider
  }

  @action add (newUser: User) {
    if (undefined === this._users.find(user => user.id === newUser.id)) {
      this._users.push(newUser)
    }
  }

  get = async (id: Number) => {
    let user = this._users.find(user => user.id === id)
    if (user === undefined) {
      // Look for user at API
      user = new User(this)
      await user.populateFromApi(id)
      this.add(user)
    }

    return user
  }

  update = async (updatedUser: User) => {
    let user = this._users.find(user => user.id === updatedUser.id)
    user.update(updatedUser)
  }
}

export class User extends BaseEntity {
  store: UserStore

  /**
   * API object parameter mapping
   * [{
   *  apiParam: 'key',
   *  getter: getter method in this class
   * }]
   *
   * @static
   * @memberof User
   */
  API_PARAMS = [
    { apiParam: 'id', getter: 'id' },
    { apiParam: 'name', getter: 'name' },
    { apiParam: 'email', getter: 'email' },
    { apiParam: 'hometown', getter: 'hometown' },
    { apiParam: 'picture', getter: 'picture' },
    { apiParam: 'favTerrain', getter: 'bike' },
    { apiParam: 'level', getter: 'level' },
    { apiParam: 'locations', getter: 'locations' },
    { apiParam: 'events', getter: 'events' },
    { apiParam: 'friends', getter: 'friends' }
  ]

  // TODO: Friends, Home Locations, ...if needed
  // Likely separate store for at least friends

  // ID can change when creating new user
  @observable _id = false
  @observable _name = null
  @observable _picture = null // Web URL
  @observable _email = null
  @observable _hometown = null
  @observable _level = null
  @observable _bike = null
  // TODO: references for other stores
  @observable _locations = []
  @observable _events = []
  @observable _friends = []
  // TODO: phone, ...

  // Picture that hasn't been uploaded yet
  @observable _tempPicture = null

  constructor (store: ?UserStore) {
    super()
    super.constructor(store)
  }

  @action updateId (newValue: Number) { this._id = newValue }
  @computed get id () { return this._id }

  @action updateName (newValue: String) { this._name = newValue }
  @computed get name () { return this._name }

  @action updatePicture (newValue: String) { this._picture = newValue }
  @computed get picture () { return this.tempPicture ? this.tempPicture.uri : this._picture }

  @action updateEmail (newValue: String) { this._email = newValue }
  @computed get email () { return this._email }

  @action updateHometown (newValue: String) { this._hometown = newValue }
  @computed get hometown () { return this._hometown }

  @action updateLevel (newValue: Number) { this._level = newValue }
  @computed get level () { return this._level }

  @action updateBike (newValue: String) { this._bike = newValue }
  @computed get bike () { return this._bike }

  @action updateLocations (newValue: Array) { this._locations = newValue }
  @action addLocation (newValue) { this._locations.push(newValue) }
  @computed get locations () { return this._locations }

  @action updateEvents (newValue: Array) { this._events = newValue }
  @action addEvent (newValue) { this._events.push(newValue) }
  @computed get events () { return this._events }

  @action updateFriends (newValue: Array) { this._friends = newValue }
  @action addFriend (newValue) { this._friends.push(newValue) }
  @computed get friends () { return this._friends }

  @action updateTempPicture (newValue: Object) { this._tempPicture = newValue }
  @computed get tempPicture () { return this._tempPicture }

  /**
   * Save a new user to Store/DB
   *
   * @memberof User
   */
  @action async saveNew () {
    let exclude = ['picture']
    let data = this.createApiJson(exclude)

    if (this.tempPicture && this.tempPicture.isWeb) {
      data.picture = this.tempPicture.uri
    }
    let userResponse = await this.store.provider.signUp(data)

    this.populateFromApiResponse(userResponse)

    if (this.tempPicture && !this.tempPicture.isWeb) {
      this.uploadPicture(this.tempPicture)
    }

    this.store.add(this)
  }

  @action uploadPicture (image: Object) {
    return this.store.provider.uploadPicture(this.id, image)
  }

  @action async update (user: User) {
    this.updateName(user.name)
    this.updatePicture(user.picture)
    this.updateEmail(user.email)
    this.updateHometown(user.hometown)
    this.updateLevel(user.level)
    this.updateBike(user.bike)
    this.updateLocations(user.locations)

    let exclude = []
    if (user.tempPicture) {
      if (user.tempPicture.isWeb) {
        this.updatePicture(user.tempPicture.uri)
      } else {
        exclude.push('picture')

        // TODO: populateFromApiResponse and reset tempPicture
        this.uploadPicture(user.tempPicture)
      }
    }

    let userResponse = await this.store.provider.updateUser(this.id, this.createApiJson(exclude))
    this.populateFromApiResponse(userResponse)
  }
}
