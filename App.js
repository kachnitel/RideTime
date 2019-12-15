import { AppLoading, Updates } from 'expo'
import * as Font from 'expo-font'
import React from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import Layout from './constants/Layout'
import AppContainer from './src/navigation/AppNavigator'
import PropTypes from 'prop-types'
import { Provider, observer } from 'mobx-react'
import applicationStore from './src/stores/ApplicationStore.singleton'
import stores from './src/stores/CollectionStores.singleton'
import PushNotifications from './src/PushNotifications'
import navigationService from './src/NavigationService'
import NotificationsHandler from './src/NotificationsHandler'
import { logger } from './src/Logger'
import { alertAsync } from './src/AsyncAlert'
import { getEnvVars } from './constants/Env'

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

export default
@observer
class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  componentDidMount = () => {
    this._checkUpdate()
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
    /**
     * When the app is started from a notification,
     * it can initialize and call the handler before
     * loading is completed
     */
    if (!stores.user.loaded) {
      await stores.user.loading
    }
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
    backgroundColor: '#fff'
  }
})
