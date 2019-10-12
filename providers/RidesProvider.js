import ApiConnection from '../src/ApiConnection'

export default class RidesProvider {
  list = (ids: ?Number[]) => {
    let q = ''
    if (ids) {
      q = '?ids=' + ids.join(',')
    }
    return ApiConnection.get('api/events' + q)
  }

  get = (id) => {
    return ApiConnection.get('api/events/' + id)
  }

  addRide = (data) => {
    return ApiConnection.post('api/events', data)
  }

  join = (id) => {
    return ApiConnection.post('api/events/' + id + '/join')
  }

  invite = (id: Number, userId: Number) => {
    return ApiConnection.post('api/events/' + id + '/invite/' + userId)
  }

  listInvites = () => {
    return ApiConnection.get('api/events/invites')
  }
}
