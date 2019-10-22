import ApiConnection from '../src/ApiConnection'

export default class RidesProvider {
  list = (ids: ?Number[]) => {
    return ApiConnection.get('api/events', ids)
    }

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

  declineInvite = (id) => {
    return ApiConnection.delete('api/events/' + id + '/invite')
  }

  leave = (id) => {
    return ApiConnection.delete('api/events/' + id + '/leave')
  }
}
