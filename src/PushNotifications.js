import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

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

    return Notifications.getExpoPushTokenAsync()
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
    Notifications.createChannelAndroidAsync('eventComment', {
      name: 'Event comments',
      description: 'New comments in events',
      sound: true,
      badge: true,
      vibrate: true
    })
  }
}
