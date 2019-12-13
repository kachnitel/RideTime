import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import { observer, inject } from 'mobx-react'
import * as SecureStore from 'expo-secure-store'
import Authentication from '../Authentication'
import ApiConnection from '../ApiConnection'
import BulletList from '../components/lists/BulletList'
import TerrainIcon from '../components/icons/TerrainIcon'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import Button from '../components/form/Button'
import { logger } from '../Logger'
import { alertAsync } from '../AsyncAlert'
import VersionTag from '../components/VersionTag'

export default
@inject('UserStore')
@inject('ApplicationStore')
@observer
class SignInScreen extends React.Component {
  state = {
    loading: false,
    loadingMessage: 'Loading...'
  }

  authenticate = async () => {
    this.setState({ loading: true, loadingMessage: 'Getting token...' })
    logger.debug('Calling loginWithAuth0')
    let auth = new Authentication()
    let token = await auth.loginWithAuth0()
    if (!token || !token.access_token) {
      logger.error('Login failed', { token: token })
      alertAsync('Login failed!')
      this.setState({ loading: false })
      return
    }
    logger.debug('Token received / updating ApplicationStore', token)
    this.setState({ loadingMessage: 'Token received, updating store...' })
    this.props.ApplicationStore.updateAccessToken(token.access_token) // token undefined!

    logger.debug('Calling getUserInfo')
    this.setState({ loadingMessage: 'Getting user info...' })
    let userInfo = await auth.getUserInfo(token.access_token)
    logger.debug('UserInfo received / Signing in', userInfo)
    this.setState({ loadingMessage: 'Signing in...' })
    try {
      var signInResult = await ApiConnection.post('signin', userInfo)
    } catch (error) {
      logger.error('POST to signin failed', {
        userInfo: userInfo,
        error: error
      })
      throw new Error('Sign in failed')
    }

    logger.debug('Sign in result received', signInResult)
    if (signInResult.success) {
      this.handleSignIn(signInResult.user, token)
    } else {
      this.props.navigation.navigate('SignUp', { user: userInfo, token: token })
    }
  }

  /**
   * Set current user ID in ApplicationStore and redirect to App
   * @memberof SignInScreen
   */
  handleSignIn = (signInResponse, token) => {
    if (!Number.isInteger(signInResponse.id)) {
      logger.info('Authentication error:', {
        signInResponse: signInResponse,
        token: token
      })
      throw new Error('Invalid user ID:' + signInResponse.id)
    }

    // On successful login save tokens
    SecureStore.setItemAsync('refreshToken', token.refresh_token)

    this.props.UserStore.upsert(signInResponse)
    this.props.ApplicationStore.updateUserId(signInResponse.id)
    // Signed in
    logger.info(`User ${signInResponse.id} signed in`)
    this.props.navigation.navigate('App')
  }

  render () {
    return (
      this.state.loading
        ? <View style={styles.container}>
          <Text style={styles.loadingText}>{ this.state.loadingMessage }</Text>
          <ActivityIndicator size='small' color={Colors.tintColor} />
          <VersionTag style={styles.versionTag} />
        </View>
        : <View style={styles.container}>
          <TerrainIcon terrain='trail' size={100} />
          <View style={styles.introText} >
            <BulletList
              data={[
                { key: 'Mountain biking made social!' },
                { key: 'Plan rides with your friends.' },
                { key: 'Ride with locals wherever you go!' }
              ]}
              itemStyle={styles.bulletListItem}
            />
          </View>
          <Button title='Get started!' onPress={this.authenticate} />
          <VersionTag style={styles.versionTag} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    color: '#fff'
  },
  introText: {
    height: Layout.window.hp(20),
    alignItems: 'center'
  },
  bulletListItem: {
    flex: 1,
    alignSelf: 'center',
    fontSize: Layout.window.hp(3),
    color: '#fff'
  },
  versionTag: {
    bottom: 0,
    position: 'absolute'
  }
})
