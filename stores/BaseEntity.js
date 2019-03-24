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
    this.API_PARAMS.map((val) => {
      let updateMethod = 'update' + val.getter.charAt(0).toUpperCase() + val.getter.slice(1)
      if (typeof this[updateMethod] === 'function') {
        // console.log(updateMethod, userResponse[val.apiParam])
        this[updateMethod](userResponse[val.apiParam])
      }
    })
  }

  /**
   * @param {?Array} exclude Array of API params to exclude
   * @returns Object
   * @memberof BaseEntity
   */
  createApiJson (exclude: ?Array) {
    return this.API_PARAMS.reduce((result, mapping) => {
      if (!(exclude && exclude.includes(mapping.apiParam))) {
        result[mapping.apiParam] = this[mapping.getter]
      }

      return result
    }, {})
  }
}
