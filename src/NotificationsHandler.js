import navigationService from './NavigationService'
import stores from './stores/CollectionStores.singleton'

export default class NotificationsHandler {
  listener = (notification: Object) => {
    let selected = notification.origin === 'selected'

    switch (notification.data?.type) {
      case 'friendRequest':
        this.handleFriendRequestReceived(notification.data, selected)
        break
      case 'friendRequestAccepted':
        this.handleFriendRequestAccepted(notification.data, selected)
        break
      case 'eventInvite':
        this.handleEventInviteReceived(notification.data, selected)
        break
    }
  }

  handleFriendRequestReceived = (data, selected) => {
    stores.user.addFriendRequest(data.from)
    if (selected) {
      navigationService.navigate('Friends')
    }
  }

  handleFriendRequestAccepted = (data, selected) => {
    stores.user.removeSentRequest(data.from)
    stores.user.currentUser.addFriend(data.from)
    if (selected) {
      navigationService.navigate('PublicProfile', { id: data.from })
    }
  }

  handleEventInviteReceived = (data, selected) => {
    let event = stores.event.upsert(data.event)
    stores.event.addInvite(event)

    if (selected) {
      navigationService.navigate('RideDetail', { event: event })
    }
  }
}
