export class BaseEntity {
  store

  constructor (store) {
    this.store = store
  }

  async populateFromApi (id: Number) {
    let user = await this.store.provider.get(id)

    this.populateFromApiResponse(user)
  }

  populateFromApiResponse (userResponse: Object) {
    this.API_PARAMS.map((key) => {
      // id => updateId()
      let updateMethod = 'update' + key.charAt(0).toUpperCase() + key.slice(1)
      if (typeof this[updateMethod] === 'function') {
        // console.log(updateMethod, userResponse[key])
        this[updateMethod](userResponse[key])
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
