import ApiConnection from '../ApiConnection'

export default class LocationsProvider {
  list = () => ApiConnection.get('api/tracking')

  add = (records: Object[]) => ApiConnection.post('api/tracking', records.map((userLocation) => ({
    gps: {
      lat: userLocation.coords[0],
      lon: userLocation.coords[1]
    },
    sessionId: userLocation.user.id,
    timestamp: userLocation.timestamp,
    visibility: userLocation.visibility,
    event: userLocation.event?.id
  })))

  clear = () => ApiConnection.delete('api/tracking')
}
