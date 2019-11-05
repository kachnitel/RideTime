import { action, computed, observable } from 'mobx'
import { BaseCollectionStore } from './BaseCollectionStore'
import LocationsProvider from '../providers/LocationsProvider'
import { BaseEntity } from './BaseEntity'

export default class TrailStore extends BaseCollectionStore {
  provider: LocationsProvider

  constructor (provider, stores) {
    super(provider, Trail, stores)
  }
}

export class Trail extends BaseEntity {
  store: TrailStore

  API_PARAMS = [
    'id',
    'title',
    'description',
    'difficulty',
    'location', // ID of parent Location
    'profile'
  ]

  @observable _id = false
  @observable _title = null
  @observable _description = null
  @observable _difficulty = null
  @observable _profile = {
    distance: undefined,
    alt_climb: undefined,
    alt_descent: undefined
  }
  @observable _location = null

  @action updateId (newValue: Number) { this._id = newValue }
  @computed get id () { return this._id }

  @action updateTitle (newValue: String) { this._title = newValue }
  @computed get title () { return this._title }

  @action updateDescription (newValue: String) { this._description = newValue }
  @computed get description () { return this._description }

  @action updateDifficulty (newValue: Number) { this._difficulty = newValue }
  @computed get difficulty () { return this._difficulty }

  @action updateLocation (newValue: Number) { this._location = newValue }
  @computed get location () { return this._location }

  @action updateProfile (newValue: Object) {
    Object.keys(this.profile).map((key) => { this._profile[key] = newValue[key] })
  }
  @computed get profile () { return this._profile }
}
