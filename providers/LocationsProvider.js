import ApiConnection from '../src/ApiConnection'

export default class LocationsProvider {
  get = (id) => {
    return ApiConnection.get('api/locations/' + id)
  }

  near = (lat, lon, range) => {
    return ApiConnection.get('api/locations/nearby', {
      lat: lat,
      lon: lon,
      range: range
    })
  }

  /*
   * Bounding box - list locations within a map
   *
   * bbox filter is in the format of
   * top-left lat/lon and bottom-right lat/lon
   * @param {Array} coords [
   *  latMin
   *  lonMin
   *  latMax
   *  lonMax
   * ]
   */
  bbox = (coords: Array) => {
    return ApiConnection.get('api/locations/bbox', {
      coords: coords
    })
  }

  search = (val) => {
    return ApiConnection.get('api/locations/search', {
      name: val
    })
  }

  filter = (filter: Object, params: Object) => {
    return ApiConnection.get('api/locations', {
      filter: filter,
      ...params
    })
  }

  trailsByLocation = (id: Number) => {
    return ApiConnection.get('api/locations/trails', {
      filter: {
        rid: id,
        activitytype: 1
      }
    })
  }

  routesByLocation = (id: Number) => {
    return ApiConnection.get('api/locations/routes', {
      filter: {
        rid: id,
        activitytype: 1
      }
    })
  }
}
