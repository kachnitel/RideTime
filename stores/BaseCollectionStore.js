import { observable, action } from 'mobx'
import { BaseEntity } from './BaseEntity'

export class BaseCollectionStore {
  _collection = observable.array([])
  provider // REVIEW: Need some sort of interface
  EntityClass: BaseEntity

  constructor (provider, EntityClass) {
    this.provider = provider
    this.EntityClass = EntityClass

    this.add = this.add.bind(this)
    this.getEntity = this.getEntity.bind(this)
    this.populateEntities = this.populateEntities.bind(this)
  }

  get = async (id: Number) => {
    let result = await this.getEntity(id)
    return result
  }

  populate = async (ids: ?Number[]) => {
    await this.populateEntities(ids)
  }

  /**
   * Get entity, look up at API if not in collection
   *
   * @param {*} entityType
   * @param {Number} id
   * @returns
   * @memberof BaseCollectionStore
   */
  async getEntity (id: Number) {
    let entity = this._findInCollection(id)
    if (entity === undefined) {
      // Look for entity at API
      entity = new this.EntityClass(this)
      await entity.populateFromApi(id)
      this.add(entity)
    }

    return entity
  }

  /**
   * Synchronously return locally stored Entity
   *
   * @param {Number} id
   * @returns BaseEntity
   * @memberof BaseCollectionStore
   */
  getSync (id: Number) {
    return this._findInCollection(id)
  }

  @action add (newEntity) {
    if (undefined === this._findInCollection(newEntity.id)) {
      this._collection.push(newEntity)
    }
  }

  update = async (updatedEntity: BaseEntity) => {
    let entity = this._findInCollection(updatedEntity.id)
    entity.update(updatedEntity)
  }

  list = () => {
    return this._collection
  }

  async populateEntities (ids: ?Number[]) {
    let results = await this.provider.list(ids)
    results.map((result) => {
      let entity = new this.EntityClass(this)
      entity.populateFromApiResponse(result)
      this.add(entity)
    })
  }

  _findInCollection (id) {
    return this._collection.find(entity => entity.id === id)
  }
}
