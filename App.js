import { AppLoading, Font } from 'expo'
import React from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import Layout from './constants/Layout'
import AppContainer from './navigation/AppNavigator'
import PropTypes from 'prop-types'
import { Provider, observer } from 'mobx-react'
import rootStore from './stores/RootStore.singleton'

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
            UserStore={rootStore.userStore}
            ApplicationStore={rootStore.appStore}
          >
            <AppContainer />
          </Provider>
        </View>
      )
    }
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
    console.warn(error)
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
