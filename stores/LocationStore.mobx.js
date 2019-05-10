import { observable, action, computed, extendObservable } from 'mobx'
import LocationsProvider from '../providers/LocationsProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'
import { Location as ExpoLocation, Permissions } from 'expo'

export default class LocationStore extends BaseCollectionStore {
  provider: LocationsProvider

  @observable _currentLocation = {}

  constructor (...args) {
    super(...args)

    /**
     * TODO: check permissions
     */
    ExpoLocation.watchPositionAsync(
      {
        accuracy: ExpoLocation.Accuracy.Balanced,
        timeInterval: 15000,
        distanceInterval: 30
      },
      (location) => {
        this.updateCurrentLocation(location)
        console.log('Location update', location)
      }
    )
  }

  @action updateCurrentLocation (location) { extendObservable(this._currentLocation, location) }
  @computed get currentLocation () { return this._currentLocation }

  nearby = async (distance) => {
    let results = await this.provider.near(
      this.currentLocation.coords.latitude,
      this.currentLocation.coords.longitude,
      distance
    )

    results.map((result) => {
      let location = this._findInCollection(result.id) || new Location(this)
      location.populateFromApiResponse(result, true)
      this.add(location)
    })

    return results
  }

  /**
   * TODO:
   *
   * @memberof LocationStore
   */
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
    'difficulties',
    'imagemap'
  ]

  @observable _id = false
  @observable _name = null // User.id
  @observable _imagemap = null
  _coords = observable.array([])
  @observable _difficulties = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0
  }

  @action updateId (newValue: Number) { this._id = newValue }
  @computed get id () { return this._id }

  @action updateName (newValue: String) { this._name = newValue }
  @computed get name () { return this._name }

  @action updateCoords (newValue: Array) { this._coords.replace(newValue) }
  @computed get coords () { return this._coords }

  @action updateDifficulties (newValue: Object) { this._difficulties = newValue }
  @computed get difficulties () { return this._difficulties }

  @action updateImagemap (newValue: String) { this._imagemap = newValue }
  @computed get imagemap () { return this._imagemap }
}
