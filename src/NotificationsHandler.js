import navigationService from './NavigationService'
import userStore from '../stores/UserStore.singleton'

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
    }
  }

  handleFriendRequestReceived = (data, selected) => {
    userStore.addFriendRequest(data.from)
    if (selected) {
      navigationService.navigate('Friends')
    }
  }

  handleFriendRequestAccepted = (data, selected) => {
    userStore.removeSentRequest(data.from)
    userStore.currentUser.addFriend(data.from)
    if (selected) {
      navigationService.navigate('PublicProfile', { id: data.from })
    }
  }
}