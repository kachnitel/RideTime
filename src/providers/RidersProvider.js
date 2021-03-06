import ApiConnection from '../ApiConnection'

export default class RidersProvider {
  /**
   * Return Promise
   * @memberof RidersProvider
   */
  get = (id) => {
    return ApiConnection.get('api/users/' + id)
  }

  list = (ids) => {
    return ApiConnection.get('api/users', { ids: ids })
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

  signIn = (data) => {
    return ApiConnection.post('signin', data)
  }

  signOut = (data) => {
    return ApiConnection.post('signout', data)
  }

  loadFriends = () => {
    return ApiConnection.get('api/users/friends')
  }

  requestFriend = (friendId: Number) => {
    return ApiConnection.post(`api/users/friends/${friendId}`)
  }

  acceptFriend = (requesterId: Number) => {
    return ApiConnection.put(`api/users/friends/${requesterId}/accept`)
  }

  removeFriend = (requesterId: Number) => {
    return ApiConnection.delete(`api/users/friends/${requesterId}`)
  }

  search = (name: String) => {
    return ApiConnection.get('api/users/search', { q: `name:${name}` })
  }
}
