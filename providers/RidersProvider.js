import ApiConnection from '../src/ApiConnection'

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
    return ApiConnection.get('api/users/' + id)
  }

  updateUser = (id, data) => {
    return ApiConnection.put('api/users/' + id, data)
  }

  uploadPicture = (id, imageObject) => {
    return ApiConnection.postFile(`api/users/${id}/picture`, 'picture', imageObject)
  }

  signUp = (data) => {
    return ApiConnection.post('signup', data)
  }

  list = (ids) => {
    return ApiConnection.get('api/users', { ids: ids })
  }

  requestFriend = (requesterId: Number, friendId: Number) => {
    return ApiConnection.post(`api/users/${requesterId}/friends/${friendId}`)
  }

  acceptFriend = (requesterId: Number, userId: Number) => {
    return ApiConnection.put(`api/users/${requesterId}/friends/${userId}/accept`)
  }

  removeFriend = (requesterId: Number, userId: Number) => {
    return ApiConnection.delete(`api/users/${requesterId}/friends/${userId}`)
  }
}
