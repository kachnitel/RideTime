import { observable, action, computed } from 'mobx'
import RidesProvider from '../providers/RidesProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'

export default class EventStore extends BaseCollectionStore {
  provider: RidesProvider

  constructor (eventProvider: ?RidesProvider) {
    super()
    this.provider = eventProvider
  }

  get = async (id: Number) => {
    let result = await super.getEntity(id, Event)
    return result
  }

  populate = async (ids: ?Number[]) => {
    let results = await this.provider.list(ids)
    results.map((result) => {
      let event = new Event(this)
      event.populateFromApiResponse(result)
      this.add(event)
    })
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
    { apiParam: 'createdBy', getter: 'createdBy' },
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
  @observable _createdBy = null // User.id
  @observable _title = null
  @observable _description = null
  @observable _members = []
  @observable _difficulty = null
  @observable _location = null // Location.id
  @observable _terrain = null
  @observable _route = null
  @observable _datetime = null

  @action updateId (newValue: Number) { this._id = newValue }
  @computed get id () { return this._id }

  @action updateCreatedBy (newValue: Number) { this._createdBy = newValue }
  @computed get createdBy () { return this._createdBy }

  @action updateTitle (newValue: String) { this._title = newValue }
  @computed get title () { return this._title }

  @action updateDescription (newValue: String) { this._description = newValue }
  @computed get description () { return this._description }

  @action updateMembers (newValue: Array) { this._members = newValue }
  @computed get members () { return this._members }

  @action updateDifficulty (newValue: Number) { this._difficulty = newValue }
  @computed get difficulty () { return this._difficulty }

  @action updateLocation (newValue: Number) { this._location = newValue }
  @computed get location () { return this._location }

  @action updateTerrain (newValue: String) { this._terrain = newValue }
  @computed get terrain () { return this._terrain }

  @action updateRoute (newValue: String) { this._route = newValue }
  @computed get route () { return this._route }

  @action updateDatetime (newValue) { this._datetime = newValue }
  @computed get datetime () { return this._datetime }

  @action async saveNew () {
    let data = this.createApiJson()
    let userResponse = await this.store.provider.addRide(data)
    this.populateFromApiResponse(userResponse)

    this.store.add(this)
  }
}
