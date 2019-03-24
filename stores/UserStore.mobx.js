import { observable, action, computed } from 'mobx' // REVIEW: 'mobx-react/native'
import RidersProvider from '../providers/RidersProvider'

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

export class User {
  userStore: UserStore

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
  @observable _name = ''
  @observable _picture = '' // Web URL
  @observable _email = ''
  @observable _hometown = ''
  @observable _level = null
  @observable _bike = ''
  // TODO: references for other stores
  @observable _locations = []
  @observable _events = []
  @observable _friends = []
  // TODO: phone, ...

  // Picture that hasn't been uploaded yet
  @observable _tempPicture = null

  constructor (userStore: ?UserStore) {
    this.userStore = userStore
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

  @action async populateFromApi (id: Number) {
    let user = await this.userStore.provider.getUser(id)

    this.populateFromApiResponse(user)
  }

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
    let userResponse = await this.userStore.provider.signUp(data)

    this.populateFromApiResponse(userResponse)

    if (this.tempPicture && !this.tempPicture.isWeb) {
      this.uploadPicture(this.tempPicture)
    }

    this.userStore.add(this)
  }

  @action uploadPicture (image: Object) {
    return this.userStore.provider.uploadPicture(this.id, image)
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

    let userResponse = await this.userStore.provider.updateUser(this.id, this.createApiJson(exclude))
    this.populateFromApiResponse(userResponse)
  }

  @action populateFromApiResponse (userResponse: Object) {
    this.updateId(userResponse.id)
    this.updateName(userResponse.name)
    this.updatePicture(userResponse.picture)
    this.updateBike(userResponse.favTerrain)
    this.updateLevel(userResponse.level)
    this.updateHometown(userResponse.hometown)
    this.updateLocations(userResponse.locations || [])
    this.updateEmail(userResponse.email)
  }

  /**
   * @param {?Array} exclude Array of API params to exclude
   * @returns Object
   * @memberof User
   */
  createApiJson (exclude: ?Array) {
    return this.API_PARAMS.reduce((result, mapping) => {
      if (!(exclude && exclude.includes(mapping.apiParam))) {
        result[mapping.apiParam] = this[mapping.getter]
      }

      return result
    }, {})
  }
}
