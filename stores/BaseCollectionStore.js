import { observable, action } from 'mobx'
import { BaseEntity } from './BaseEntity'

export class BaseCollectionStore {
  _collection = observable.array([])

  constructor () {
    this.getEntity = this.getEntity.bind(this)
  }

  async getEntity (id: Number, entityType) {
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
}
