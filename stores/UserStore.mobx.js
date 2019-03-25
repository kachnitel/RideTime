import { observable, action, computed } from 'mobx'
import RidersProvider from '../providers/RidersProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'

export default class UserStore extends BaseCollectionStore {
  provider: RidersProvider

  get = async (id: Number) => {
    let result = await super.getEntity(User, id)
    return result
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

  // ID can change when creating new user
  @observable _id = false
  @observable _name = null
  @observable _picture = null // Web URL
  @observable _email = null
  @observable _hometown = null
  @observable _level = null
  @observable _bike = null
  @observable _locations = []
  @observable _events = []
  @observable _friends = []

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
    let exclude = []

    this.API_PARAMS.map((val) => {
      let key = val.getter
      if (JSON.stringify(user[key]) === JSON.stringify(this[key])) {
        exclude.push(key)
      }
    })

    if (user.tempPicture) {
      if (user.tempPicture.isWeb) {
        this.updatePicture(user.tempPicture.uri)
      } else {
        exclude.push('picture')

        let response = await this.uploadPicture(user.tempPicture)
        // Update picture url
        this.populateFromApiResponse(response)
        // Reset tempPicture
        this.updateTempPicture(User.prototype._tempPicture)
      }
    }

    let userResponse = await this.store.provider.updateUser(this.id, user.createApiJson(exclude))
    this.populateFromApiResponse(userResponse)
  }
}
