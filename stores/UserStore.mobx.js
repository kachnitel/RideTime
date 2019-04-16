import { observable, action, computed, toJS, when } from 'mobx'
import RidersProvider from '../providers/RidersProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'
import ApplicationStore from './ApplicationStore.mobx'

export default class UserStore extends BaseCollectionStore {
  provider: RidersProvider
  @observable applicationStore: ApplicationStore

  constructor (provider, EntityClass, applicationStore: ApplicationStore) {
    super(provider, EntityClass)
    this.applicationStore = applicationStore
  }

  /**
   * @returns {User} Signed in user
   * @readonly
   * @memberof UserStore
   */
  @computed get currentUser () {
    return this.getSync(this.applicationStore.userId)
  }

  disposer = when(
    () => this.applicationStore?.accessToken,
    () => {
      this.loadDashboard()
    }
  )

  _friendRequests = observable.array([])
  _sentRequests = observable.array([])

  @action updateFriendRequests (newValue: Array) { this._friendRequests.replace(newValue) }
  @computed get friendRequests () { return this._friendRequests }
  @action addFriendRequest (id: Number) { this._friendRequests.push(id) }
  @action removeFriendRequest (id: Number) { this._friendRequests.remove(id) }

  @action updateSentRequests (newValue: Array) { this._sentRequests.replace(newValue) }
  @computed get sentRequests () { return this._sentRequests }
  @action addSentRequest (id: Number) { this._sentRequests.push(id) }

  async loadDashboard () {
    let dashboard = await this.provider.dashboard()
    let currentUser = this._findInCollection(dashboard.currentUser.id) || new User(this)
    currentUser.populateFromApiResponse(dashboard.currentUser)
    this.add(currentUser)
    this.updateFriendRequests(dashboard.requests)
    this.updateSentRequests(dashboard.sentRequests)
  }

  /**
   * @param {Number} id
   */
  requestFriend (id: Number) {
    this.provider.requestFriend(id)
    this.addSentRequest(id)
  }

  /**
   * @param {Number} id
   */
  acceptFriendRequest (id: Number) {
    this.provider.acceptFriend(id)
    this.currentUser.addFriend(id)
    this.removeFriendRequest(id)
  }

  declineFriendRequest (id: Number) {
    this.provider.removeFriend(id)
    this.removeFriendRequest(id)
  }

  removeFriend (id: Number) {
    this.provider.removeFriend(id)
    this.currentUser.removeFriend(id)
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
    'id',
    'name',
    'email',
    'hometown',
    'picture',
    'bike',
    'level',
    'locations',
    'events',
    'friends'
  ]

  // ID can change when creating new user
  @observable _id = false
  @observable _name = null
  @observable _picture = null // Web URL
  @observable _email = null
  @observable _hometown = null
  @observable _level = null
  @observable _bike = null
  _locations = observable.array([])
  _events = observable.array([])
  _friends = observable.array([])

  // Picture that hasn't been uploaded yet
  @observable _tempPicture = null

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

  @action updateLocations (newValue: Array) { this._locations.replace(newValue) }
  @action addLocation (newValue) { this._locations.push(newValue) }
  @computed get locations () { return this._locations }

  @action updateEvents (newValue: Array) { this._events.replace(newValue) }
  @action addEvent (newValue) { this._events.push(newValue) }
  @computed get events () { return this._events }

  @action updateFriends (newValue: Array) { this._friends.replace(newValue) }
  @action addFriend (newValue) { this._friends.push(newValue) }
  @action removeFriend (id) { this._friends.remove(id) }
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
    let exclude = []

    this.API_PARAMS.map((key) => {
      if (JSON.stringify(user[key]) === JSON.stringify(this[key])) {
        exclude.push(key)
      }
    })

    if (user.tempPicture) {
      if (user.tempPicture.isWeb) {
        this.updatePicture(user.tempPicture.uri)
      } else {
        exclude.push('picture')

        let response = await this.uploadPicture(toJS(user.tempPicture))
        // Update picture url
        this.populateFromApiResponse(response)
        // Reset tempPicture
        this.updateTempPicture(User.prototype._tempPicture)
      }
    }

    let userResponse = await this.store.provider.updateUser(this.id, user.createApiJson(exclude))
    this.populateFromApiResponse(userResponse)
  }

  isFriendWith (id) {
    return this.friends.indexOf(id) !== -1
  }
}
