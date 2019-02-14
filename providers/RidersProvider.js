import { get, post } from './Connection'

export default class RidersProvider {
  constructor (apiToken) {
    this.apiToken = apiToken
  }

  getUser = (id) => {
    return get('api/users/' + id, this.apiToken)
  }

  signIn = (data) => {
    return post('signin', this.apiToken, data)
  }
}
