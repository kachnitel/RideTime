import ApiConnection from '../ApiConnection'

export default class RidesProvider {
  addRide = (data) => ApiConnection.post('api/events', data)
  list = (ids: Number[]) => ApiConnection.get('api/events/filter', { id: ids })
  filter = (filters: Object) => ApiConnection.get('api/events/filter', filters)
  get = (id) => ApiConnection.get('api/events/' + id)

  /** Membership */
  join = (id) => ApiConnection.post('api/events/' + id + '/join')
  leave = (id) => ApiConnection.delete('api/events/' + id + '/leave')

  invite = (id: Number, userId: Number) => ApiConnection.post('api/events/' + id + '/invite/' + userId)
  listInvites = () => ApiConnection.get('api/events/invites')
  declineInvite = (id) => ApiConnection.delete('api/events/' + id + '/invite')

  listSentRequests = () => ApiConnection.get('api/events/requests')
  listRequests = (id: Number) => ApiConnection.get('api/events/' + id + '/requests')
  acceptRequest = (id: Number, userId: Number) => ApiConnection.put('api/events/' + id + '/requests/' + userId)
  declineRequest = (id: Number, userId: Number) => ApiConnection.delete('api/events/' + id + '/requests/' + userId)

  /** Comments */
  getComments = (eventId) => ApiConnection.get('api/events/' + eventId + '/comments')
  addComment = (eventId, message: String) => ApiConnection.post(
    'api/events/' + eventId + '/comments',
    { message: message }
  )
}
