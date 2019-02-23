/* global fetch */
import React from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import Authentication from '../src/Authentication'
import { observer, inject } from 'mobx-react'
import { getHeaders } from '../providers/Connection'
import { SecureStore } from 'expo'
import { getEnvVars } from '../constants/Env'
import BulletList from '../components/lists/BulletList'
import TerrainIcon from '../components/icons/TerrainIcon'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default
@inject('UserStore')
@observer
class SignInScreen extends React.Component {
  state = {
    loading: false
  }

  authenticate = async () => {
    this.setState({ loading: true })

    let auth = new Authentication()
    let token = await auth.loginWithAuth0()
    let userInfo = await auth.getUserInfo(token.access_token)

    this.props.UserStore.updateAccessToken(token.access_token)

    let signInResponse = await this.signInToAPI(token.access_token, userInfo)

    // handle response code, navigate to SignUpScreen if User not found
    if (signInResponse.status === 200) {
      if (await !signInResponse.ok) {
        console.log('User Response:', signInResponse)
        throw new Error('Network request failed (!userResponse.ok)')
      }

      // On successful login save tokens
      SecureStore.setItemAsync('refreshToken', token.refresh_token)

      let user = await signInResponse.json()

      this.props.UserStore.updateUserId(user.id)
      this.props.UserStore.updateName(user.name)
      this.props.UserStore.updatePicture(user.picture)

      // Signed in
      console.info(`User ${user.id} signed in`)
      this.props.navigation.navigate('App')
    } else if (signInResponse.status === 404) {
      // Must sign up
      console.info(`Signing up user`, userInfo)
      this.props.navigation.navigate('SignUp', { user: userInfo })
    } else {
      console.log('Authentication failed', {
        signInResponse: signInResponse,
        token: token
      })
      throw new Error('Error signing in')
    }
  }

  /**
   * FIXME: API connection needs to be in provider
   * (AuthProvider.signIn(userInfo))
   *
   * POST /signin
   * @return Promise
   * {
   *   "id": 1,
   *   "name": "Duck",
   *   "hometown": "",
   *   "events": [
   *       {
   *           "id": 22,
   *           "datetime": "2019-02-08T23:25:00+00:00",
   *           "title": "Alice Lake ride"
   *       }
   *   ],
   *   "friends": [
   *       {
   *           "id": 1,
   *           "name": "Duck"
   *       }
   *   ],
   *   "level": 0,
   *   "preferred": 0,
   *   "favourites": "",
   *   "picture": null,
   *   "email": "kachnitel@gmail.com"
   * }
   * @memberof SignInScreen
   */
  signInToAPI = async (accessToken, userInfo) => {
    let url = getEnvVars().apiUrl + '/signin'
    let response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(accessToken),
      body: JSON.stringify(userInfo)
    }).catch((error) => {
      throw new Error(error)
    })

    return response
  }

  render () {
    return (
      this.state.loading
        ? <View style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text>
          <ActivityIndicator size='small' color={Colors.tintColor} />
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
          <Button title='Get started!' onPress={this.authenticate} color={Colors.tintColor} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40
  },
  introText: {
    height: Layout.window.hp(20),
    alignItems: 'center'
  },
  bulletListItem: {
    flex: 1,
    alignSelf: 'center',
    fontSize: Layout.window.hp(3),
    color: Colors.tintColor
  }
})
