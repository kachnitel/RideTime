import { observable, action, computed } from 'mobx'
import RidesProvider from '../providers/RidesProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'
import UserStore from './UserStore.mobx'

export default class EventStore extends BaseCollectionStore {
  provider: RidesProvider
  @observable userStore: UserStore

  constructor (provider, stores) {
    super(provider, Event, stores)
    this.userStore = stores.user // REVIEW: redundant with stores object?
  }

  _invites = observable.array([])

  @action updateInvites (newValue: Array) { this._invites.replace(newValue) }
  @computed get invites () { return this._invites }
  @action addInvite (event: Event) { this._invites.indexOf(event) === -1 && this._invites.push(event) }
  @action removeInvite (event: Event) { this._invites.remove(event) }

  /**
   * TODO: async loadInvites = () => { ...provider.listInvites() }
   * - populate store w/ events from response and add to _invites
   *  - IDs or complete object(reference)?
   *    - if object reference, access to everything is smoother and easier
   *      - requires knowing the referenced object - recursion might be difficult
   *    - IDs used in USer (either way, ensure consistency)
   * - add to autorun (see UserStore dashboard for example ) ?
   */

  async loadInvites () {
    let invites = await this.provider.listInvites()
    invites.results.map((item) => {
      let event = this.upsert(item)
      this.addInvite(event)
    })
  }

  /**
   * Shows events with `datetime > 1 hour ago`
   * TODO: make the start date configurable, turn into a method
   *
   * @returns
   * @memberof EventStore
   */
  @computed get futureEvents () {
    return this._collection
      .filter(this.filterFutureEvent)
  }

  async filter (filters: Object) {
    let response = await this.provider.filter(filters)
    return response.results.map((item) => this.upsert(item))
      .filter(this.filterFutureEvent)
  }

  async myEvents () {
    let currentUser = await this.userStore.getCurrentUserAsync()
    let response = await this.provider.list(currentUser.events)
    return response.results.map((item) => this.upsert(item))
      .filter(this.filterFutureEvent)
  }

  /**
   * Filter events that started from an hour ago forward
   * Just so that events happening now are still visible
   *
   * @memberof EventStore
   */
  filterFutureEvent = (event: Event) => event.datetime > (Math.floor(Date.now() / 1000) - 3600)
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
    'invited',
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
  _members = observable.array([]) // Number[]
  _invited = observable.array([])
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

  @action updateInvited (newValue: Number[]) { this._invited.replace(newValue) }
  @computed get invited () { return this._invited }

  @action updateMembers (newValue: Number[]) { this._members.replace(newValue) }
  @action addMember (newValue: Number) { !this._members.includes(newValue) && this._members.push(newValue) }
  @computed get members () { return this._members }
  @action removeMember (id: Number) { this._members.remove(id) }

  @action invite (userId: Number) {
    this.store.provider.invite(this.id, userId)
    this._invited.push(userId)
  }

  @action join () {
    this.store.provider.join(this.id)
    this.addMember(this.store.userStore.currentUser.id)
  }

  @action leave () {
    this.store.provider.leave(this.id)
    this.removeMember(this.store.userStore.currentUser.id)
  }

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

  /**
   * Returns whether user id a member of event
   * if no userId is provided, current user is used
   *
   * @param {?Number} userId
   * @returns
   * @memberof Event
   */
  isMember (userId: ?Number) {
    if (userId === undefined) {
      userId = this.store.userStore.currentUser.id
    }
    return this.members.includes(userId)
  }

  @action async acceptInvite () {
    await this.store.provider.join(this.id)
    this.addMember(this.store.userStore.currentUser.id)
    this.invited.remove(this.store.userStore.currentUser.id)
    this.store.removeInvite(this)
  }

  @action async declineInvite () {
    await this.store.provider.declineInvite(this.id)
    this.store.removeInvite(this)
  }
}