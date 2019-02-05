import { get } from './Connection'

export default class RidersProvider {
  // TODO: Needs to accept parameter w/ ID list
  // getUsers = () => {
  //   return get('users')
  // }

  getUser = (id) => {
    return get('users/' + id)
  }
}
