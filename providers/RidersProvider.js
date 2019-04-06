import Connection from '../src/Connection'

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
    return Connection.get('api/users/' + id)
  }

  updateUser = (id, data) => {
    return Connection.put('api/users/' + id, data)
  }

  uploadPicture = (id, imageObject) => {
    return Connection.postFile(`api/users/${id}/picture`, 'picture', imageObject)
  }

  signUp = (data) => {
    return Connection.post('signup', data)
  }

  list = () => {
    return Connection.get('api/users')
  }

  requestFriend = (requesterId: Number, friendId: Number) => {
    return Connection.post(`api/users/${requesterId}/friends/${friendId}`)
  }

  acceptFriend = (requesterId: Number, userId: Number) => {
    return Connection.put(`api/users/${requesterId}/friends/${userId}/accept`)
  }

  removeFriend = (requesterId: Number, userId: Number) => {
    return Connection.delete(`api/users/${requesterId}/friends/${userId}`)
  }
}
