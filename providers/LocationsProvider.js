// TODO: filter by visible frame https://github.com/reggie3/react-native-webview-leaflet/blob/8e5830fc23d121db19f51d7dea872d553c253ba5/web/mapComponent.js#L307
import ApiConnection from '../src/ApiConnection'

export default class LocationsProvider {
  /*
     * TODO: Define ranges of lat/lon if map provides corners
     * otherwise let server figure it out
     * @param latMin
     * @param latMax
     * @param lonMin
     * @param lonMax
     *
     */
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
}
