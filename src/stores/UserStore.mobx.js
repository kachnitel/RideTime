import { observable, action, computed, toJS, autorun } from 'mobx'
import RidersProvider from '../providers/RidersProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'
import ApplicationStore from './ApplicationStore.mobx'
import PushNotifications from '../PushNotifications'
import { logger } from '../Logger'

export default class UserStore extends BaseCollectionStore {
  provider: RidersProvider
  @observable _loaded = false
  @observable applicationStore: ApplicationStore

  constructor (provider, stores, applicationStore: ApplicationStore) {
    super(provider, User, stores)
    this.applicationStore = applicationStore

    autorun(async (reaction) => {
      if (this.applicationStore.accessToken && this.applicationStore.userId && !this.loaded) {
        // FIXME: rather pointless since it no longer waits for user here
        this.updateLoaded(true)
      }
    })
  }

  /**
   * @returns {User} Signed in user
   * @readonly
   * @memberof UserStore
   */
  @computed get currentUser () {
    return this.get(this.applicationStore.userId)
  }

  getCurrentUserAsync () {
    return this.getAsync(this.applicationStore.userId)
  }

  _friendRequests = observable.array([])
  _sentRequests = observable.array([])

  @action updateFriendRequests (newValue: Array) { this._friendRequests.replace(newValue) }
  @computed get friendRequests () { return this._friendRequests }
  @action addFriendRequest (id: Number) { this._friendRequests.indexOf(id) === -1 && this._friendRequests.push(id) }
  @action removeFriendRequest (id: Number) { this._friendRequests.remove(id) }

  @action updateSentRequests (newValue: Array) { this._sentRequests.replace(newValue) }
  @computed get sentRequests () { return this._sentRequests }
  @action addSentRequest (id: Number) { this._sentRequests.indexOf(id) === -1 && this._sentRequests.push(id) }
  @action removeSentRequest (id: Number) { this._sentRequests.remove(id) }

  @action updateLoaded (newValue: Boolean) { this._loaded = newValue }
  @computed get loaded () { return this._loaded }

  async loadFriends () {
    let friends = await this.provider.loadFriends()
    friends.confirmed.forEach(this.upsert)
    this.currentUser.updateFriends(friends.confirmed.map((userData) => userData.id))

    friends.requests.sent.forEach(this.upsert)
    this.updateSentRequests(friends.requests.sent.map((userData) => userData.id))

    friends.requests.received.forEach(this.upsert)
    this.updateFriendRequests(friends.requests.received.map((userData) => userData.id))
  }

  async signUp (user: User) {
    return user.saveNew()
  }

  async signIn () {
    try {
      var signInResponse = await this.provider.signIn({
        notificationsToken: await (new PushNotifications()).getToken()
      })
    } catch (error) {
      logger.error('POST to signin failed', {
        error: error.data
      })
      throw new Error('Sign in failed')
    }

    return signInResponse.success
      ? this.upsert(signInResponse.user)
      : false
  }

  /**
   * Search users by name
   *
   * @param {String} name
   * @returns {User[]}
   * @memberof UserStore
   */
  async search (name: String) {
    let response = await this.provider.search(name)
    let results = response.results
    results.map(this.upsert)

    return results
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

  reset () {
    this._friendRequests.clear()
    this._sentRequests.clear()
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
  _locations = observable.array([]) // Location.id[]
  _events = observable.array([]) // Event.id[]
  _friends = observable.array([]) // User.id[]

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
  @action addLocation (newValue: Number) { this._locations.push(newValue) }
  @computed get locations () { return this._locations }

  @action updateEvents (newValue: Array) { this._events.replace(newValue) }
  @action addEvent (newValue: Number) { this._events.push(newValue) }
  @action removeEvent (id: Number) { this._events.remove(id) }
  @computed get events () { return this._events }

  @action updateFriends (newValue: Number[]) { this._friends.replace(newValue) }
  @action addFriend (newValue: Number) { this._friends.indexOf(newValue) === -1 && this._friends.push(newValue) }
  @action removeFriend (id: Number) { this._friends.remove(id) }
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
    let userResponse = await this.store.provider.signUp({
      userInfo: data,
      notificationsToken: await (new PushNotifications()).getToken()
    })

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
