import { get } from './Connection'

export default class RidersProvider {
  getUser = (id) => {
    return get('users/' + id)
  }
}
