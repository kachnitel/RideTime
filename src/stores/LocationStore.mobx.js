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
    return this.filter({
      lat: coords.latitude,
      lon: coords.longitude,
      nearby_range: distance
    })
  }

  nearbySync = (distance: Number) => this._collection.filter((location: Location) => {
    return location.distance < distance
  })

  /**
   * Bounding box - list locations within a map
   *
   * bbox filter is in the format of
   * top-left lat/lon and bottom-right lat/lon
   * @param {Array} coords [
   *  latMin
   *  lonMin
   *  latMax
   *  lonMax
   * ]
   */
  bbox = (bbox: Array) => {
    return this.filter({ bbox: bbox })
  }

  bboxSync = (bbox: Array) => this._collection.filter((location: Location) => {
    return location.coords[0] > bbox[0] && location.coords[0] < bbox[2] &&
      location.coords[1] > bbox[1] && location.coords[1] < bbox[3]
  })

  search = (name: String) => {
    return this.filter({ search: name })
  }

  searchSync = (name: String) => this._collection.filter((location: Location) => {
    return location.name.includes(name)
  })

  filter = async (filter: Object, params: Object = {}) => {
    let response = await this.provider.filter(filter, params)
    let results = this.populateResults(response.results)
    response.relatedEntities && this.populateRelated(response.relatedEntities)

    return results
  }

  /**
   * FIXME: duplicates populateRelated from parent
   *
   * @memberof LocationStore
   * @returns {Location[]}
   */
  populateResults = (results: Array) => results.map(this.upsert)

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
    'imagemap',
    'alias',
    'coverPhoto'
  ]

  @observable _id = false
  @observable _name = null // User.id
  @observable _imagemap = null
  @observable _alias = null
  @observable _coverPhoto = null
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

  @action updateAlias (newValue: String) { this._alias = newValue }
  @computed get alias () { return this._alias }

  @action updateCoords (newValue: Array) { this._coords.replace(newValue) }
  @computed get coords () { return this._coords }

  @action updateDifficulties (newValue: Object) { this._difficulties = newValue }
  @computed get difficulties () { return this._difficulties }

  @action updateImagemap (newValue: String) { this._imagemap = newValue }
  @computed get imagemap () { return this._imagemap }

  @action updateCoverPhoto (newValue: String) { this._coverPhoto = newValue }
  @computed get coverPhoto () { return this._coverPhoto }

  @computed get trails () {
    return this.store.stores.trail.list().filter((item) => item.location === this.id)
  }

  @computed get routes () {
    return this.store.stores.route.list().filter((item) => item.location === this.id)
  }

  @computed get events () {
    return this.store.stores.event.list().filter((item) => item.location === this.id)
  }

  /**
   * Credit: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
   *
   * @readonly
   * @memberof Location
   */
  @computed get distance () {
    let toRad = (deg) => deg * Math.PI / 180

    let [ lat1, lon1 ] = this.coords
    let lat2 = this.store.currentLocation.get('coords').latitude
    let lon2 = this.store.currentLocation.get('coords').longitude
    let R = 6371 // Radius of the earth in km

    let dLat = toRad(lat2 - lat1)
    let dLon = toRad(lon2 - lon1)
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in km
  }

  loadTrails = async () => {
    while (!this._trailsLoaded.completed) {
      let response = await this.store.provider.trailsFilter({ rid: this.id })
      let data = response.results
      this.store.populateRelated({ trail: data })
      this._trailsLoaded.loaded += data.length

      // TODO: need to find a way to tell all is loaded
      this._trailsLoaded.completed = true
    }
  }

  loadRoutes = async () => {
    while (!this._routesLoaded.completed) {
      let response = await this.store.provider.routesFilter({ rid: this.id })
      let data = response.results
      this.store.populateRelated({ route: data })
      this._routesLoaded.loaded += data.length

      this.store.populateRelated(response.relatedEntities)

      // TODO: need to find a way to tell all is loaded
      this._routesLoaded.completed = true
    }
  }
}
