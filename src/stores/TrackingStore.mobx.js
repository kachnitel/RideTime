import { action, computed, observable } from 'mobx'
import { Alert } from 'react-native'
import * as ExpoLocation from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'
import { BaseCollectionStore } from './BaseCollectionStore'
import TrackingProvider from '../providers/TrackingProvider'
import { BaseEntity } from './BaseEntity'
import { Event } from './EventStore.mobx'
import { logger } from '../Logger'
import { TRACKING_BG_UPDATE, TRACKING_BG_SYNC } from '../../constants/Strings'

export default class TrackingStore extends BaseCollectionStore {
  provider: TrackingProvider

  constructor (provider, stores) {
    super(provider, UserLocation, stores)
  }

  _queue = observable.array([])
  @observable _status = null // null|'event'|'friends'|'emergency'
  @observable _event = null

  @action updateEvent (newValue: Event) { this._event = newValue }
  @computed get event () { return this._event }

  @action updateStatus (newValue: ?String) { this._status = newValue }
  @computed get status () { return this._status }

  @computed get trackedUsers () {
    return this._collection
      .map((ul: UserLocation) => ul.user)
      .filter((item, index, array) => array.indexOf(item) === index) // Unique
  }

  @computed get current () {
    return this.trackedUsers.map((user: Number) => this._collection
      .filter((ul: UserLocation) => ul.user === user)
      .sort((a: UserLocation, b: UserLocation) => b.timestamp - a.timestamp)[0] // Desc
    )
  }

  @computed get tracks () {
    return this.trackedUsers.map((user: Number) => this._collection
      .filter((ul: UserLocation) => ul.user === user)
      .sort((a: UserLocation, b: UserLocation) => b.timestamp - a.timestamp) // Desc
    )
  }

  list = async () => {
    let response = await this.provider.list()
    return response.results.map(this.upsert)
  }

  enable = async (visibility: String, event: ?Event) => {
    await this.stores.location.getLocationPermissions()

    if (visibility === 'event') {
      this._event = event
    }
    this.updateStatus(visibility)

    let status = await BackgroundFetch.getStatusAsync()
    switch (status) {
      case BackgroundFetch.Status.Restricted:
      case BackgroundFetch.Status.Denied:
        logger.log('Background execution is disabled')
        Alert.alert('Background sync is disabled')
        return
      default: {
        logger.debug('Registering tasks')

        await this.cleanupTasks()
        await Promise.all([
          await ExpoLocation.startLocationUpdatesAsync(TRACKING_BG_UPDATE, {
            accuracy: ExpoLocation.Accuracy.High,
            timeInterval: 15000,
            distanceInterval: 10, // REVIEW:
            foregroundService: {
              notificationTitle: 'RideTime Live tracking',
              notificationBody: 'Live location tracking enabled'
            }
          }),
          await BackgroundFetch.registerTaskAsync(TRACKING_BG_SYNC, {
            minimumInterval: 15
          })
        ])

        logger.debug('Registered tasks', await TaskManager.getRegisteredTasksAsync())
      }
    }
  }

  stop = () => {
    this.cleanupTasks()
    this._queue.clear()
    this.provider.clear()
    this.updateEvent(null)
    this.updateStatus(null)
  }

  cleanupTasks = async () => {
    let tasks = await TaskManager.getRegisteredTasksAsync()

    if (tasks.find(f => f.taskName === TRACKING_BG_UPDATE)) {
      logger.debug('Killing task ' + TRACKING_BG_UPDATE)
      await ExpoLocation.stopLocationUpdatesAsync(TRACKING_BG_UPDATE)
    }
    if (tasks.find(f => f.taskName === TRACKING_BG_SYNC)) {
      logger.debug('Killing task ' + TRACKING_BG_SYNC)
      await BackgroundFetch.unregisterTaskAsync(TRACKING_BG_SYNC)
    }
  }

  enqueue = (location: ExpoLocation.LocationData) => {
    let ul = new UserLocation(this)
    ul.updateCoords([location.coords.latitude, location.coords.longitude])
    ul.updateTimestamp(Math.floor(location.timestamp / 1000))
    ul.updateUser(this.stores.user.currentUser)
    ul.updateVisibility(this._status)
    this._event && ul.updateEvent(this._event)

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

  @action updateUser (newValue: Number) { this._user = newValue }
  @computed get user () { return this._user }

  @action updateEvent (newValue: Number) { this._event = newValue }
  @computed get event () { return this._event }

  @action updateVisibility (newValue: string) { this._visibility = newValue }
  @computed get visibility () { return this._visibility }

  @action updateTimestamp (newValue: Number) { this._timestamp = newValue }
  @computed get timestamp () { return this._timestamp }

  @action updateCoords (newValue: Array) { this._coords = newValue }
  @computed get coords () { return this._coords }
}
