import { logger } from '../src/Logger'

export class BaseEntity {
  store

  constructor (store) {
    this.store = store
  }

  async populateFromApi (id: Number) {
    let { result, relatedEntities } = await this.store.provider.get(id)
    this.populateFromApiResponse(result)

    if (relatedEntities) {
      if (typeof this.store.populateRelated !== 'function') {
        logger.warn('Received objects to populate relations but Store has no method to do so')
      } else {
        this.store.populateRelated(relatedEntities)
      }
    }
  }

  populateFromApiResponse (responseData: Object, skipNullValues: Boolean) {
    this.API_PARAMS.map((key) => {
      // id => updateId()
      let updateMethod = 'update' + key.charAt(0).toUpperCase() + key.slice(1)
      if (typeof this[updateMethod] === 'function') {
        if (skipNullValues && responseData[key] == null) {
          return
        }
        this[updateMethod](responseData[key])
      } else {
        throw new Error(`Trying to call undefined updater '${updateMethod}'`)
      }
    })
  }

  /**
   * @param {?Array} exclude Array of API params to exclude
   * @returns Object
   * @memberof BaseEntity
   */
  createApiJson (exclude: ?Array) {
    return this.API_PARAMS.reduce((result, key) => {
      if (!(exclude && exclude.includes(key))) {
        result[key] = this[key]
      }

      return result
    }, {})
  }
}
