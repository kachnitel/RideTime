import { get, post } from './Connection'

export default class RidesProvider {
  getRides = () => {
    return get('events')
  }

  getRide = (id) => {
    return get('events/' + id)
  }

  addRide = (data) => {
    return post('events', data)
  }
}
