import { observable, action, computed } from 'mobx'
import RidesProvider from '../providers/RidesProvider'
import { BaseEntity } from './BaseEntity'
import { BaseCollectionStore } from './BaseCollectionStore'
import UserStore from './UserStore.mobx'

export default class EventStore extends BaseCollectionStore {
  provider: RidesProvider
  @observable userStore: UserStore

  constructor (provider, EntityClass, userStore: UserStore) {
    super(provider, EntityClass)
    this.userStore = userStore
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
   * - add to autorun (see UserStore dashboard for example )
   */

  async loadInvites () {
    let invites = await this.provider.listInvites()
    invites.map((item) => {
      let event = this._findInCollection(item.id) || new Event(this)

      event.populateFromApiResponse(item, true)
      this.add(event)
      this.addInvite(event)
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
  // Array of objects { id, name, picture }
  // FIXME: should be array of users|IDs, not "in between"
  _members = observable.array([])
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

  @action updateInvited (newValue: Array) { this._invited.replace(newValue) }
  @computed get invited () { return this._invited }

  @action updateMembers (newValue: Array) { this._members.replace(newValue) }
  @computed get members () { return this._members }

  @action async invite (userId: Number) {
    this.store.provider.invite(this.id, userId)
    this._invited.push(userId)
  }

  @action async join () {
    this.store.provider.join(this.id)
    this._members.push(this.store.userStore.currentUser.id)
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
    return this.members.findIndex((item) => item.id === userId) !== -1
  }
}
