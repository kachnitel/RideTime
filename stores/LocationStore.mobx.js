import { observable, action, computed } from 'mobx'
import LocationsProvider from '../providers/LocationsProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'
import * as Permissions from 'expo-permissions'
import * as ExpoLocation from 'expo-location'
import { persist } from 'mobx-persist'

export default class LocationStore extends BaseCollectionStore {
  provider: LocationsProvider

  @persist('map') @observable _currentLocation = new Map()

  constructor (provider, stores) {
    super(provider, Location, stores)

    this.watchPosition()
  }

  getLocationPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })

      return false
    }

    return status
  }

  watchPosition = async () => {
    await this.getLocationPermissions()
    ExpoLocation.watchPositionAsync(
      {
        accuracy: ExpoLocation.Accuracy.Balanced,
        timeInterval: 15000,
        distanceInterval: 30
      },
      (location) => this.updateCurrentLocation(location)
    )
  }

  @action updateCurrentLocation (location) {
    this._currentLocation.merge(location)
  }
  @computed get currentLocation () { return this._currentLocation }

  nearby = async (distance: Number) => {
    let coords =
      this.currentLocation.get('coords') ||
      (await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Lowest,
        maximumAge: 300000
      })).coords
    let response = await this.provider.near(
      coords.latitude,
      coords.longitude,
      distance
    )
    let results = response.results
    this.populateResults(results)

    return results
  }

  bbox = async (bbox: Array) => {
    let response = await this.provider.bbox(bbox)
    let results = response.results
    this.populateResults(results)

    return results
  }

  /**
   * @memberof LocationStore
   */
  search = async (name: String) => {
    let response = await this.provider.search(name)
    let results = response.results
    this.populateResults(results)

    return results
  }

  /**
   * FIXME: duplicates populateEntities from parent
   *
   * @memberof LocationStore
   */
  populateResults = (results: Array) => {
    results.forEach((result) => {
      this.upsert(result)
    })
  }

  watchPosition
}

export class Location extends BaseEntity {
  store: LocationStore

  /**
   * Object parameters returned by API
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

  _trailsLoaded = {
    completed: false,
    loaded: 0
  }

  _routesLoaded = {
    completed: false,
    loaded: 0
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

  @computed get trails () {
    return this.store.stores.trail.list().filter((item) => item.location === this.id)
  }

  @computed get routes () {
    return this.store.stores.route.list().filter((item) => item.location === this.id)
  }

  loadTrails = async () => {
    while (!this._trailsLoaded.completed) {
      let response = await this.store.provider.trailsByLocation(this.id)
      let data = response.results
      this.store.populateRelated({ trail: data })
      this._trailsLoaded.loaded += data.length

      // TODO: need to find a way to tell all is loaded
      this._trailsLoaded.completed = true
    }
  }

  loadRoutes = async () => {
    while (!this._routesLoaded.completed) {
      let response = await this.store.provider.routesByLocation(this.id)
      let data = response.results
      this.store.populateRelated({ route: data })
      this._routesLoaded.loaded += data.length

      this.store.populateRelated(response.relatedEntities)

      // TODO: need to find a way to tell all is loaded
      this._routesLoaded.completed = true
    }
  }
}
