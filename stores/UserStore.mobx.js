import { observable, action, computed } from 'mobx' // REVIEW: 'mobx-react/native'
import RidersProvider from '../providers/RidersProvider'
import { RootStore } from './RootStore'

export default class UserStore {
  provider: RidersProvider
  rootStore: RootStore
  @observable _users = []

  constructor (rootStore: RootStore, userProvider: ?RidersProvider) {
    this.rootStore = rootStore
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

  @action async populateFromApi (id: Number) {
    let user = await this.userStore.provider.getUser(id)

    this.populateFromApiResponse(user)
  }

  @action async save () {
    let userResponse = await this.userStore.provider.signUp({
      name: this.name,
      hometown: this.hometown,
      email: this.email,
      level: this.level,
      favTerrain: this.bike,
      locations: this.locations,
      picture: this.tempPicture
    })

    this.populateFromApiResponse(userResponse)

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
    this.updateTempPicture(user.tempPicture)
    this.updateLocations(user.locations)

    return this.userStore.provider.updateUser(this.id, this.createApiJson)
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

  @computed get createApiJson () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      hometown: this.hometown,
      picture: this.picture,
      favTerrain: this.bike,
      level: this.level,
      locations: this.locations
    }
  }
}
