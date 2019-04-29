import ApiConnection from '../src/ApiConnection'

export default class NotificationsProvider {
  setToken = (token: String) => {
    return ApiConnection.put('notifications/token', { token: token })
  }
}
