import { action, computed, observable } from 'mobx'
import { BaseCollectionStore } from './BaseCollectionStore'
import LocationsProvider from '../providers/LocationsProvider'
import { BaseEntity } from './BaseEntity'

export default class TrailStore extends BaseCollectionStore {
  provider: LocationsProvider

  constructor (provider, stores) {
    super(provider, Trail, stores)
  }

  filter = async (filter: Object) => {
    let response = await this.provider.trailsFilter(filter)
    let results = response.results
    return results.map(this.upsert)
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
    'profile',
    'alias',
    'source',
    'remoteId'
  ]

  @observable _id = false
  @observable _title = null
  @observable _description = null
  @observable _difficulty = null
  /**
   * _profile = { distance, alt_climb, alt_descent }
   */
  @observable _profile = new Map()
  @observable _location = null
  @observable _source = null
  @observable _remoteId = null

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

  @action updateAlias (newValue: Number) { this._alias = newValue }
  @computed get alias () { return this._alias }

  @action updateProfile (newValue: Object) {
    this._profile.merge(newValue)
  }
  @computed get profile () { return this._profile }

  @action updateSource (newValue: Number) { this._source = newValue }
  @computed get source () { return this._source }

  @action updateRemoteId (newValue: Number) { this._remoteId = newValue }
  @computed get remoteId () { return this._remoteId }
}
