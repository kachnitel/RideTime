import { observable, action, computed } from 'mobx'
import LocationsProvider from '../providers/LocationsProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'

export default class LocationStore extends BaseCollectionStore {
  provider: LocationsProvider

  /**
   * TODO:
   *
   * @memberof LocationStore
   */
  nearby = (distance) => { return this.list() }

  search = (name: String) => { return this.list() }
}

export class Location extends BaseEntity {
  store: LocationStore

  /**
   * API object parameter mapping
   * [{
   *  apiParam: 'key',
   *  getter: getter method in this class
   * }]
   *
   * @static
   * @memberof Location
   */
  API_PARAMS = [
    'id',
    'name',
    'coords',
    'difficulties'
  ]

  @observable _id = false
  @observable _name = null // User.id
  _coords = observable.array([])
  _difficulties = observable.array([])

  @action updateId (newValue: Number) { this._id = newValue }
  @computed get id () { return this._id }

  @action updateName (newValue: String) { this._name = newValue }
  @computed get name () { return this._name }

  @action updateCoords (newValue: Array) { this._coords.replace(newValue) }
  @computed get coords () { return this._coords }

  @action updateDifficulties (newValue: Array) { this._difficulties.replace(newValue) }
  @computed get difficulties () { return this._difficulties }
}
