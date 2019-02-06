import { get } from './Connection'

export default class RidesProvider {
  getRides = () => {
    return get('events')
  }

  getRide = (id) => {
    return get('events/' + id)
  }
}
