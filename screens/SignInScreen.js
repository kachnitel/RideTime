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
import { getHeaders, apiUrl } from '../providers/Connection'
import { SecureStore } from 'expo'

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

    let user = await this.signInToAPI(token.access_token, userInfo)

    // On successful login save tokens
    SecureStore.setItemAsync('refreshToken', token.refresh_token)

    this.props.UserStore.updateAccessToken(token.access_token)
    this.props.UserStore.updateUserId(user.id)
    this.props.UserStore.updateName(user.name)
    this.props.UserStore.updateProfilePic(user.picture)

    console.info(`User ${user.id} signed in`)
    this.props.navigation.navigate('App')
  }

  /**
   * TODO: handle response code, navigate to SignUpScreen if 201
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
    let userResponse = await fetch('http://' + apiUrl + '/ridetime/signin', {
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

    return userResponse.json()
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
