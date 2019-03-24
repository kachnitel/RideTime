import { get, post } from '../src/Connection'

export default class RidesProvider {
  list = (ids: ?Number[]) => {
    let q = ''
    if (ids) {
      q = '?ids=' + ids.join(',')
    }
    return get('api/events' + q)
  }

  get = (id) => {
    return get('api/events/' + id)
  }

  addRide = (data) => {
    return post('api/events', data)
  }
}
