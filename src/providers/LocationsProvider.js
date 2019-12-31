import ApiConnection from '../ApiConnection'

export default class LocationsProvider {
  get = (id) => {
    return ApiConnection.get('api/locations/' + id)
  }

  filter = (filter: Object, params: Object) => {
    return ApiConnection.get('api/locations', {
      filter: filter,
      ...params
    })
  }

  trailsFilter = (filter: Object) => {
    return ApiConnection.get('api/locations/trails', {
      filter: {
        activitytype: 1,
        ...filter
      }
    })
  }

  routesFilter = (filter: Object) => {
    return ApiConnection.get('api/locations/routes', {
      filter: {
        activitytype: 1,
        ...filter
      }
    })
  }
}
