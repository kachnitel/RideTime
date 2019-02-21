/* global fetch */
import React from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Authentication from '../src/Authentication'
import { observer, inject } from 'mobx-react'
import { getHeaders } from '../providers/Connection'
import { SecureStore } from 'expo'
import { getEnvVars } from '../constants/Env'

export default
@inject('UserStore')
@observer
class SignInScreen extends React.Component {
  state = {
    loading: false
  }

  authenticate = async () => {
    let auth = new Authentication()
    let token = await auth.loginWithAuth0()
    this.setState({ loading: true })
    let userInfo = await auth.getUserInfo(token.access_token)

    let signInResponse = await this.signInToAPI(token.access_token, userInfo)
    let user = await signInResponse.json()

    // On successful login save tokens
    SecureStore.setItemAsync('refreshToken', token.refresh_token)

    this.props.UserStore.updateAccessToken(token.access_token)
    this.props.UserStore.updateUserId(user.id)
    this.props.UserStore.updateName(user.name)
    this.props.UserStore.updateProfilePic(user.picture)

    // handle response code, navigate to SignUpScreen if 201
    console.info(`User ${user.id} signed in (${signInResponse.status})`)
    this.props.navigation.navigate(signInResponse.status === 201 ? 'SignUp' : 'App')
  }

  /**
   * FIXME: API connection needs to be in provider
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
    let userResponse = await fetch(url, {
      method: 'POST',
      headers: getHeaders(accessToken),
      body: JSON.stringify(userInfo)
    }).catch((error) => {
      throw new Error(error)
    })

    if (await !userResponse.ok) {
      console.log('User Response:', userResponse)
      throw new Error('Network request failed (!userResponse.ok)')
    }

    return userResponse
  }

  render () {
    return (
      <View style={styles.container}>
        { this.state.loading
          ? <Text style={styles.title}>Loading...</Text>
          : <View>
            <Text style={styles.title}>Example: Auth0 login</Text>
            <Button title='Login with Auth0' onPress={this.authenticate} />
          </View>
        }
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
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40
  }
})
