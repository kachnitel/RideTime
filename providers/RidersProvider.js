import { get } from './Connection'

export default class RidersProvider {
  constructor (apiToken) {
    this.apiToken = apiToken
  }

  getUser = (id) => {
    return get('api/users/' + id, this.apiToken)
  }

  signIn = () => {
    return get('signin', this.apiToken)
  }
}
