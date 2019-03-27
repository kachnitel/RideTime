import { get, put, post, postFile } from '../src/Connection'

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
  get = (id) => {
    return get('api/users/' + id)
  }

  updateUser = (id, data) => {
    return put('api/users/' + id, data)
  }

  uploadPicture = (id, imageObject) => {
    return postFile(`api/users/${id}/picture`, 'picture', imageObject)
  }

  signUp = (data) => {
    return post('signup', data)
  }

  list = () => {
    return get('api/users')
  }
}
