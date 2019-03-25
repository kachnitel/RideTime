import { observable, action, computed } from 'mobx'
import RidesProvider from '../providers/RidesProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'

export default class EventStore extends BaseCollectionStore {
  provider: RidesProvider

  get = async (id: Number) => {
    let result = await super.getEntity(Event, id)
    return result
  }

  populate = async (ids: ?Number[]) => {
    await super.populateEntities(Event, ids)
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
    'id',
    'createdBy',
    'title',
    'description',
    'members',
    'difficulty',
    'location',
    'terrain',
    'route',
    'datetime'
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
