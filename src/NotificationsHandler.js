import navigationService from './NavigationService'
import stores from './stores/CollectionStores.singleton'

export default class NotificationsHandler {
  listener = (notification: Object) => {
    let callback, screen, screenParams
    switch (notification.data?.type) {
      case 'friendRequest':
        callback = this.handleFriendRequestReceived
        screen = 'Friends'
        break
      case 'friendRequestAccepted':
        callback = this.handleFriendRequestAccepted
        screen = 'PublicProfile'
        screenParams = { id: notification.data.from }
        break
      case 'eventInvite':
        callback = this.handleEventInviteReceived
        screen = 'RideDetail'
        screenParams = { event: notification.data.event } // FIXME: expects Event object
        break
      default:
        return
    }

    this.runAuthenticated(() => {
      callback(notification.data)

      if (notification.origin === 'selected') {
        navigationService.navigate(screen, screenParams)
      }
    })
  }

  handleFriendRequestReceived = (data) => {
    stores.user.addFriendRequest(data.from)
  }

  handleFriendRequestAccepted = (data) => {
    stores.user.removeSentRequest(data.from)
    stores.user.currentUser.addFriend(data.from)
  }

  handleEventInviteReceived = (data) => {
    let event = stores.event.upsert(data.event)
    stores.event.addInvite(event)
  }

  /**
   * Check whether current user is loaded
   * Calls callback if it is, otherwise redirects to AuthLoading first
   *
   * @memberof NotificationsHandler
   */
  runAuthenticated = (callback: Function) => {
    try {
      let cu = stores.user.currentUser // HACK: checking whether user is loaded
    } catch (error) {
      return navigationService.navigate('AuthLoading', { onSuccess: callback })
    }

    return callback()
  }
}
