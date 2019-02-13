import { get, post } from './Connection'

export default class RidesProvider {
  getRides = () => {
    return get('api/events')
  }

  getRide = (id) => {
    return get('api/events/' + id)
  }

  addRide = (data) => {
    return post('api/events', data)
  }
}
