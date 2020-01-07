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
import BulletList from '../components/lists/BulletList'
import TerrainIcon from '../components/icons/TerrainIcon'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import Button from '../components/form/Button'
import { logger } from '../Logger'
import VersionTag from '../components/VersionTag'
import { User } from '../stores/UserStore.mobx'

export default
@inject('UserStore')
@inject('ApplicationStore')
@observer
class SignInScreen extends React.Component {
  state = {
    loading: false,
    loadingMessage: 'Loading...',
    error: false
  }

  authenticate = async () => {
    this.setState({ loading: true, loadingMessage: 'Authenticating...' })

    let auth = new Authentication()
    let token = await auth.loginWithAuth0()
    if (!token || !token.access_token) {
      logger.error('Login failed', { token: token })
      this.setState({ loading: false, error: true })
      return
    }
    this.props.ApplicationStore.updateAccessToken(token.access_token)

    this.setState({ loadingMessage: 'Signing in...' })

    let user = await this.props.UserStore.signIn()

    if (user) {
      this.handleSignIn(user, token)
    } else {
      this.setState({ loadingMessage: 'Getting user info...' })
      this.props.navigation.navigate('SignUp', {
        user: await auth.getUserInfo(token.access_token),
        token: token
      })
    }
  }

  /**
   * Set current user ID in ApplicationStore and redirect to App
   * @memberof SignInScreen
   */
  handleSignIn = (user: User, token) => {
    // On successful login save tokens
    SecureStore.setItemAsync('refreshToken', token.refresh_token)

    this.props.ApplicationStore.updateUserId(user.id)
    // Signed in
    logger.info(`User ${user.id} signed in`)
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
          {this.state.error && <Text style={styles.errorText}>
            Error signing in!

            Please try again or let us know if the problem persists!
          </Text>}
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
  },
  errorText: {
    color: Colors.warningText
  }
})
