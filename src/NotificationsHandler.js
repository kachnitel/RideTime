import navigationService from './NavigationService'
import stores from './stores/CollectionStores.singleton'
import { Event } from './stores/EventStore.mobx'

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
        screenParams = { eventId: notification.data.event.id }
        break
      case 'eventMemberJoined':
        callback = this.handleEventMemberJoined
        screen = 'RideDetail'
        screenParams = { eventId: notification.data.event.id }
        break
      case 'eventCommentAdded':
        callback = this.handleEventCommentAdded
        screen = 'RideDetail'
        // TODO: open screen with `showMessages` param
        screenParams = { eventId: notification.data.event.id }
        break
      case 'eventOwnRequestAccepted':
        callback = this.handleEventOwnRequestAccepted
        screen = 'RideDetail'
        screenParams = { eventId: notification.data.event.id }
        break
      case 'eventJoinRequested':
        callback = this.handleEventJoinRequested
        screen = 'RideDetail'
        screenParams = { eventId: notification.data.event.id }
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

  handleEventMemberJoined = (data) => {
    let event: Event = stores.event.upsert(data.event)
    event.members.map((id) => { event.requested.includes(id) && event.requested.remove(id) })
  }

  handleEventOwnRequestAccepted = (data) => {
    let event: Event = stores.event.upsert(data.event)
    stores.event.removeSentRequest(event.id)
  }

  handleEventCommentAdded = (data) => {
    stores.event.upsert(data.event)
    stores.comment.upsert(data.comment)
  }

  handleEventJoinRequested = (data) => {
    let event: Event = stores.event.upsert(data.event)
    event.addRequested(data.from)
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
