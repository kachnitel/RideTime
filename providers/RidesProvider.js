import Connection from '../src/Connection'

export default class RidesProvider {
  list = (ids: ?Number[]) => {
    let q = ''
    if (ids) {
      q = '?ids=' + ids.join(',')
    }
    return Connection.get('api/events' + q)
  }

  get = (id) => {
    return Connection.get('api/events/' + id)
  }

  addRide = (data) => {
    return Connection.post('api/events', data)
  }
}
