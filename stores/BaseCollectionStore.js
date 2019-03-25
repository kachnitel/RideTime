import { observable, action } from 'mobx'
import { BaseEntity } from './BaseEntity'

export class BaseCollectionStore {
  _collection = observable.array([])
  provider // REVIEW: Need some sort of interface

  constructor (provider) {
    this.provider = provider

    this.getEntity = this.getEntity.bind(this)
    this.populateEntities = this.populateEntities.bind(this)
  }

  async getEntity (entityType, id: Number) {
    let entity = this._collection.find(entity => entity.id === id)
    if (entity === undefined) {
      // Look for entity at API
      entity = new [entityType][0](this)
      await entity.populateFromApi(id)
      this.add(entity)
    }

    return entity
  }

  @action add (newEntity) {
    if (undefined === this._collection.find(entity => entity.id === newEntity.id)) {
      this._collection.push(newEntity)
    }
  }

  update = async (updatedEntity: BaseEntity) => {
    let entity = this._collection.find(entity => entity.id === updatedEntity.id)
    entity.update(updatedEntity)
  }

  list = () => {
    return this._collection
  }

  async populateEntities (entityType, ids: ?Number[]) {
    let results = await this.provider.list(ids)
    results.map((result) => {
      let entity = new [entityType][0](this)
      entity.populateFromApiResponse(result)
      this.add(entity)
    })
  }
}
