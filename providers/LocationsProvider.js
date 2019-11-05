import ApiConnection from '../src/ApiConnection'

export default class LocationsProvider {
  list = () => {
    return ApiConnection.get('api/locations')
  }

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

  trailsByLocation = (id: Number) => {
    return ApiConnection.get('api/locations/' + id + '/trails')
  }
}
