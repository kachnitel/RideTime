import { observable, action } from 'mobx'
import { BaseEntity } from './BaseEntity'

export class BaseCollectionStore {
  _collection = observable.array([])
  provider // REVIEW: Need some sort of interface
  EntityClass: BaseEntity
  stores: Object

  constructor (provider, EntityClass, stores) {
    this.provider = provider
    this.EntityClass = EntityClass
    this.stores = stores

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
   * @returns {BaseEntity}
   * @memberof BaseCollectionStore
   */
  getSync (id: Number) {
    let entity = this._findInCollection(id)
    if (!entity) {
      throw new Error(`Trying to get entity ${this.EntityClass.name}:${id} before it is initialized`)
    }
    return entity
  }

  /**
   * @param {*} newEntity
   * @memberof BaseCollectionStore
   */
  @action add (newEntity) {
    if (undefined === this._findInCollection(newEntity.id)) {
      this._collection.push(newEntity)
    }
  }

  update = async (updatedEntity: BaseEntity) => {
    let entity = this._findInCollection(updatedEntity.id)
    entity.update(updatedEntity)
  }

  /**
   * Update or insert an entity to store from JSON object
   *
   * @param {*} object API Response formatted object
   * @memberof EventStore
   */
  @action upsert = (object) => {
    let entity = this._findInCollection(object.id) || new this.EntityClass(this)

    entity.populateFromApiResponse(object, true)
    this.add(entity)

    return entity
  }

  list = () => {
    return this._collection
  }

  /**
   * @param {?Number[]} ids
   * @memberof BaseCollectionStore
   */
  async populateEntities (ids: ?Number[]) {
    let results = await this.provider.list(ids)
    results.map((result) => {
      this.upsert(result)
    })
  }

  populateRelated = (related: Object) => {
    Object.keys(related).map((type) => {
      if (this.stores[type] === undefined) {
        console.warn('Received `relatedEntities` of an unknown type: ' + type)
        return
      }

      related[type].map(this.stores[type].upsert)
    })
  }

  _findInCollection (id) {
    return this._collection.find(entity => entity.id === id)
  }
}
