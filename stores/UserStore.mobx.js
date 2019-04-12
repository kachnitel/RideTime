import { observable, action, computed, toJS } from 'mobx'
import RidersProvider from '../providers/RidersProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'

export default class UserStore extends BaseCollectionStore {
  provider: RidersProvider

  // WIP add getters/setters
  // use in FriendListScreen
  // Replace AppStore.userId with signedInUser throughout the app
  _friendRequests = observable.array([])
  _sentRequests = observable.array([])
  @observable _signedInUserId = null

  @action updateSignedInUserId (id: Number) {
    this._signedInUserId = id
    return this.get(id) // load from API if not known
  }

  /**
   * Synchronosly get current user
   *
   * @readonly
   * @memberof UserStore
   */
  @computed get signedInUser () {
    return this.getSync(this._signedInUserId)
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
  @computed get friends () { return this._friends }

  // /**
  //  * Create new Friendship and push to API
  //  * @param {Number} id
  //  */
  // @action addFriend (id: Number) {
  //   this.addFriendship({
  //     userId: this.id,
  //     friendId: id,
  //     status: 0
  //   })
  //   this.store.provider.requestFriend(this.id, id)
  // }

  // @action acceptFriend (id: Number) {
  //   let fs = this.friendships.find((fs) => fs.userId === id)
  //   fs.accept()
  //   this.store.provider.acceptFriend(id, this.id)
  // }

  // @action removeFriend (id: Number) {
  //   let fs = this.friendships.find((fs) =>
  //     (fs.userId === this.id && fs.friendId === id) ||
  //     (fs.friendId === this.id && fs.userId === id)
  //   )
  //   this.store._friendships.remove(fs)

  //   this.store.provider.removeFriend(fs.userId, fs.friendId)
  // }

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

// export class Friendship {
//   /**
//    * ID of requesting user
//    *
//    * @memberof Friendship
//    */
//   _userId
//   /**
//    * ID of other party
//    *
//    * @memberof Friendship
//    */
//   _friendId
//   /**
//    * 0 - pending
//    * 1 - accepted
//    *
//    * @memberof Friendship
//    */
//   @observable _status

//   constructor (userId: Number, friendId: Number, status: Number = 0) {
//     this._userId = userId
//     this._friendId = friendId
//     this._status = status
//   }

//   static request (userStore: UserStore, myId: Number, friendId: Number) {
//     let fs = new this(myId, friendId)
//     userStore.addFriendship(fs)
//     return fs
//   }

//   @computed get friendId () { return this._friendId }

//   @computed get status () { return this._status }

//   @computed get userId () { return this._userId }

//   @action accept () {
//     this._status = 1
//   }
// }
