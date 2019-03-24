import { observable, action, computed } from 'mobx'
import RidesProvider from '../providers/RidesProvider'
import { BaseEntity } from './BaseEntity'

export default class EventStore {
  provider: RidesProvider
  _events = observable.array([])

  constructor (eventProvider: ?RidesProvider) {
    this.provider = eventProvider
  }

  @action add (newEvent: Event) {
    if (undefined === this._events.find(event => event.id === newEvent.id)) {
      this._events.push(newEvent)
    }
  }

  get = async (id: Number) => {
    let event = this._events.find(event => event.id === id)
    if (event === undefined) {
      // Look for event at API
      event = new Event(this)
      await event.populateFromApi(id)
      this.add(event)
    }

    return event
  }

  update = async (updatedEvent: Event) => {
    let event = this._events.find(event => event.id === updatedEvent.id)
    event.update(updatedEvent)
  }

  populate = async (ids: ?Number[]) => {
    let results = await this.provider.list(ids)
    results.map((result) => {
      let event = new Event(this)
      event.populateFromApiResponse(result)
      this.add(event)
    })
  }

  list = () => {
    return this._events
  }
}

export class Event extends BaseEntity {
  store: EventStore

  /**
   * API object parameter mapping
   * [{
   *  apiParam: 'key',
   *  getter: getter method in this class
   * }]
   *
   * @static
   * @memberof Event
   */
  API_PARAMS = [
    { apiParam: 'id', getter: 'id' },
    { apiParam: 'title', getter: 'title' },
    { apiParam: 'description', getter: 'description' },
    { apiParam: 'members', getter: 'members' },
    { apiParam: 'difficulty', getter: 'difficulty' },
    { apiParam: 'location', getter: 'location' },
    { apiParam: 'terrain', getter: 'terrain' },
    { apiParam: 'route', getter: 'route' },
    { apiParam: 'datetime', getter: 'datetime' }
  ]

  @observable _id = false
  @observable _title = null
  @observable _description = null
  @observable _members = []
  @observable _difficulty = null
  @observable _location = null
  @observable _terrain = null
  @observable _route = null
  @observable _datetime = null

  @action updateId (newValue: Number) { this._id = newValue }
  @computed get id () { return this._id }

  @action updateTitle (newValue: String) { this._title = newValue }
  @computed get title () { return this._title }

  @action updateDescription (newValue: String) { this._description = newValue }
  @computed get description () { return this._description }

  @action updateMembers (newValue: Array) { this._members = newValue }
  @computed get members () { return this._members }

  @action updateDifficulty (newValue: Number) { this._difficulty = newValue }
  @computed get difficulty () { return this._difficulty }

  /**
   * {
   *  id: Number,
   *  name: String,
   *  gps: Array[lat, lon]
   * }
   *
   * @param {Object} newValue
   * @memberof Event
   */
  @action updateLocation (newValue: Object) { this._location = newValue }
  @computed get location () { return this._location }

  @action updateTerrain (newValue: String) { this._terrain = newValue }
  @computed get terrain () { return this._terrain }

  @action updateRoute (newValue: String) { this._route = newValue }
  @computed get route () { return this._route }

  @action updateDatetime (newValue: Number) { this._datetime = newValue }
  @computed get datetime () { return this._datetime }
}
