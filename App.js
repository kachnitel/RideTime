import { AppLoading, Updates } from 'expo'
import * as Font from 'expo-font'
import React from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  AppState
} from 'react-native'
import Layout from './constants/Layout'
import AppContainer from './src/navigation/AppNavigator'
import PropTypes from 'prop-types'
import { Provider, observer } from 'mobx-react'
import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch'
import applicationStore from './src/stores/ApplicationStore.singleton'
import stores from './src/stores/CollectionStores.singleton'
import PushNotifications from './src/PushNotifications'
import navigationService from './src/NavigationService'
import NotificationsHandler from './src/NotificationsHandler'
import { logger } from './src/Logger'
import { alertAsync } from './src/AsyncAlert'
import { getEnvVars } from './constants/Env'
import Colors from './constants/Colors'
import { TRACKING_BG_UPDATE, TRACKING_BG_SYNC } from './constants/Strings'

/**
 * Set default Text style
 */
let oldRender = Text.render
Text.render = function (...args) {
  let origin = oldRender.call(this, ...args)
  return React.cloneElement(origin, {
    style: [{ fontFamily: 'Roboto', fontSize: Layout.window.hp(2) }, origin.props.style]
  })
}

TaskManager.defineTask(TRACKING_BG_UPDATE, ({ data: { locations }, error }) => {
  if (error) {
    logger.error('Error processing background location update', error)
    return
  }
  locations.map(stores.tracking.enqueue)
})

TaskManager.defineTask(TRACKING_BG_SYNC, () => {
  try {
    const receivedNewData = stores.tracking.push()
    return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData
  } catch (error) {
    logger.error('Error syncing location data', error)
    return BackgroundFetch.Result.Failed
  }
})

export default
@observer
class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  componentDidMount = () => {
    this._checkUpdate()

    // HACK: Workaround to "touch" AppState
    // - See https://github.com/expo/expo/issues/6679#issuecomment-570963717
    logger.debug(AppState.currentState)
  }

  render () {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <Provider
            ApplicationStore={applicationStore}
            UserStore={stores.user}
            EventStore={stores.event}
            LocationStore={stores.location}
            TrailStore={stores.trail}
            RouteStore={stores.route}
            CommentStore={stores.comment}
            TrackingStore={stores.tracking}
          >
            <AppContainer
              ref={(navigatorRef) => {
                navigationService.setRootNavigator(navigatorRef)
                this._notificationsSubscribe()
              }}
            />
          </Provider>
        </View>
      )
    }
  }

  async _checkUpdate () {
    if (getEnvVars().dev === true) {
      return
    }
    try {
      let update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        let confirmDownload = await alertAsync('Update available', 'Download now?')
        if (!confirmDownload) {
          return
        }
        await Updates.fetchUpdateAsync()

        let confirmReload = await alertAsync('Update downloaded', 'Reload app now?')
        if (confirmReload) {
          Updates.reloadFromCache()
        }
      }
    } catch (e) {
      logger.error('Update failed!', e)
    }
  }

  async _notificationsSubscribe () {
    let notifications = new PushNotifications()
    let handler = new NotificationsHandler()
    notifications.subscribe(handler.listener)
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'Roboto': require('./assets/fonts/roboto/Roboto-Regular.ttf')
      })
    ])
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    logger.warn(error)
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  };
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground
  }
})
