import navigationService from './NavigationService'
import userStore from '../stores/UserStore.singleton'

export default class NotificationsHandler {
  listener = (notification: Object) => {
    let selected = notification.origin === 'selected'

    if (notification.data?.type === 'friendRequest') {
      this.handleFriendRequestReceived(notification.data, selected)
    }
  }

  handleFriendRequestReceived = async (data, selected) => {
    userStore.addFriendRequest(data.from)
    if (selected) {
      navigationService.navigate('Friends')
    }
  }
}
