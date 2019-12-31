import { action, computed, observable } from 'mobx'
import { BaseCollectionStore } from './BaseCollectionStore'
import RidesProvider from '../providers/RidesProvider'
import { BaseEntity } from './BaseEntity'
import { User } from './UserStore.mobx'
import { Event } from './EventStore.mobx'

export default class CommentStore extends BaseCollectionStore {
  provider: RidesProvider

  getComments = (event: Event) => {
    return this._collection.filter((comment: Comment) => event.comments.includes(comment.id))
  }

  loadCommentsAsync = async (event: Event) => {
    let response = await this.provider.getComments(event.id)
    let comments = response.results.map(this.upsert)
    event.updateComments(comments.map((comment) => comment.id))
    return comments
  }

  addComment = async (event: Event, message: String) => {
    let response = await this.provider.addComment(event.id, message)
    let comment = this.upsert(response.result)
    event.addComment(comment.id)
    return comment
  }

  constructor (provider, stores) {
    super(provider, Comment, stores)
  }
}

export class Comment extends BaseEntity {
  store: CommentStore

  API_PARAMS = [
    'id',
    'author',
    'message',
    'timestamp',
    'seenBy'
  ]

  @observable _id = false
  @observable _author = null // User.id
  @observable _message = null
  @observable _timestamp = null
  _seenBy = observable.array([]) // Number[]

  @action updateId (newValue: Number) { this._id = newValue }
  @computed get id () { return this._id }

  @action updateAuthor (newValue: Number) { this._author = newValue }
  @computed get author () { return this._author }

  @action updateMessage (newValue: Number) { this._message = newValue }
  @computed get message () { return this._message }

  @action updateTimestamp (newValue: Number) { this._timestamp = newValue }
  @computed get timestamp () { return this._timestamp }

  @action updateSeenBy (newValue: Number[]) { this._seenBy = newValue }
  @computed get seenBy () { return this._seenBy }
  @action addSeenBy (newValue: Number) { !this._seenBy.includes(newValue) && this._seenBy.push(newValue) }

  seenByUser = (user: User) => !!this.seenBy.find((id) => id === user.id)
}
