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
    /**
     * When the app is started from a notification,
     * it can initialize and call the handler before
     * loading is completed
     */
    if (!userStore.loaded) {
      await userStore.loading
    }
    userStore.addFriendRequest(data.from)
    if (selected) {
      navigationService.navigate('Friends')
    }
  }
}
