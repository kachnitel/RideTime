import { get, post } from '../src/Connection'

export default class RidesProvider {
  list = () => {
    return get('api/events')
  }

  get = (id) => {
    return get('api/events/' + id)
  }

  addRide = (data) => {
    return post('api/events', data)
  }
}
