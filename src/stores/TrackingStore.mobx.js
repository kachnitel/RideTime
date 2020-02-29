import { action, computed, observable } from 'mobx'
import { BaseCollectionStore } from './BaseCollectionStore'
import TrackingProvider from '../providers/TrackingProvider'
import * as ExpoLocation from 'expo-location'
import { BaseEntity } from './BaseEntity'
import { User } from './UserStore.mobx'
import { Event } from './EventStore.mobx'
import { logger } from '../Logger'

export default class TrackingStore extends BaseCollectionStore {
  provider: TrackingProvider

  constructor (provider, stores) {
    super(provider, UserLocation, stores)
  }

  _queue = observable.array([])
  @observable _event = null
  @observable _status = null // null|'event'|'friends'|'emergency'
  _syncInterval = null
  _watchPosition = null

  @action updateEvent (newValue: Event) { this._event = newValue }
  @computed get event () { return this._event }

  @action updateStatus (newValue: ?String) { this._status = newValue }
  @computed get status () { return this._status }

  @computed get current () {
    // TODO: List most recent location of all known users
  }
  // @computed get history () {}

  list = async () => {
    let response = await this.provider.list()
    return response.results.map(this.upsert)
  }

  enable = async (visibility: String, event: ?Event) => {
    if (visibility === 'event') {
      this._event = event
    }

    await this.stores.location.getLocationPermissions()
    this._watchPosition = await ExpoLocation.watchPositionAsync(
      {
        accuracy: ExpoLocation.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 5 // REVIEW:
      },
      (location) => this.enqueue(
        location,
        visibility,
        event
      )
    )
    this._syncInterval = setInterval(this.push, 10000)
  }

  stop = () => {
    this._watchPosition.remove()
    clearInterval(this._syncInterval)
    this._queue.clear()
    this.provider.clear()
  }

  enqueue = (location: ExpoLocation.LocationData, visibility: String, event: ?Event) => {
    let ul = new UserLocation(this)
    ul.updateCoords([location.coords.latitude, location.coords.longitude])
    ul.updateTimestamp(Math.floor(location.timestamp / 1000))
    ul.updateUser(this.stores.user.currentUser)
    ul.updateVisibility(visibility)
    event && ul.updateEvent(event)

    this._queue.push(ul)
  }

  push = async () => {
    if (!this._queue.length) {
      return
    }

    let load = this._queue.clear()
    try {
      var result = await this.provider.add(load)
    } catch (error) {
      logger.info('Error pushing location updates', {
        loadSize: load.length,
        error: error
      })
      this._queue.push(...load)
      return
    }

    return result.results.forEach(this.upsert)
  }
}

export class UserLocation extends BaseEntity {
  store: TrackingStore

  API_PARAMS = [
    'id',
    'user',
    'visibility',
    'coords',
    'timestamp',
    'event'
  ]

  @observable _id = null
  @observable _user = null
  @observable _event = null
  @observable _visibility = null
  @observable _timestamp = null
  @observable _coords = null

  @action updateId (newValue: Number) { this._id = newValue }
  @computed get id () { return this._id }

  @action updateUser (newValue: User) { this._user = newValue }
  @computed get user () { return this._user }

  @action updateEvent (newValue: Event) { this._event = newValue }
  @computed get event () { return this._event }

  @action updateVisibility (newValue: string) { this._visibility = newValue }
  @computed get visibility () { return this._visibility }

  @action updateTimestamp (newValue: Number) { this._timestamp = newValue }
  @computed get timestamp () { return this._timestamp }

  @action updateCoords (newValue: Array) { this._coords = newValue }
  @computed get coords () { return this._coords }
}
