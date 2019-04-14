import ApiConnection from '../src/ApiConnection'

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

  dashboard = () => {
    return ApiConnection.get('dashboard')
  }

  // requestFriend = (requesterId: Number, friendId: Number) => {
  //   return ApiConnection.post(`api/users/${requesterId}/friends/${friendId}`)
  // }

  acceptFriend = (requesterId: Number) => {
    return ApiConnection.put(`dashboard/friends/${requesterId}/accept`)
  }

  removeFriend = (requesterId: Number) => {
    return ApiConnection.delete(`dashboard/friends/${requesterId}`)
  }

  // removeFriend = (requesterId: Number, userId: Number) => {
  //   return ApiConnection.delete(`api/users/${requesterId}/friends/${userId}`)
  // }
}
