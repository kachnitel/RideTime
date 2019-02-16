import { get, post } from './Connection'

export default class RidersProvider {
  /**
   * Return Promise
   * {
   *   "id": 71,
   *   "name": "Ondřej Váňa",
   *   "hometown": null,
   *   "events": [],
   *   "friends": [],
   *   "level": null,
   *   "preferred": null,
   *   "favourites": null,
   *   "picture": "https://lh5.googleusercontent.com/-txLCi973qWQ/AAAAAAAAAAI/AAAAAAAANuk/BpCrITncuGE/photo.jpg",
   *   "email": "vana.ondrej@gmail.com"
   * }
   *
   * @memberof RidersProvider
   */
  getUser = (id) => {
    return get('api/users/' + id)
  }

  /**
   * POST /signin
   * @return Promise (getUser)
   *
   * @memberof RidersProvider
   */
  // signIn = (data) => {
  //   return post('signin', data)
  // }
}
