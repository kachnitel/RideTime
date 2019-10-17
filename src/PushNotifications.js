import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import NotificationsProvider from '../providers/NotificationsProvider'

export default class PushNotifications {
  getToken = async () => {
    let result = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )

    if (result.status !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      result = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    }

    if (result.status !== 'granted') {
      return
    }

    let token = await Notifications.getExpoPushTokenAsync()
    return token
  }

  updateToken = async () => {
    let token = await this.getToken()
    if (token) {
      let provider = new NotificationsProvider()
      provider.setToken(token)
    }
  }

  /**
   * @memberof PushNotifications
   */
  subscribe = (listener) => {
    Notifications.addListener(listener)
    Notifications.createChannelAndroidAsync('friendship', {
      name: 'Friendships',
      description: 'Friend requests',
      sound: true,
      badge: true,
      vibrate: true
    })
    Notifications.createChannelAndroidAsync('eventMember', {
      name: 'Event memberships',
      description: 'Invites, join requests',
      sound: true,
      badge: true,
      vibrate: true
    })
  }
}
