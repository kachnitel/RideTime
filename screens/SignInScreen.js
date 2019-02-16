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

export default
@inject('UserStore')
@observer
class SignInScreen extends React.Component {
  state = {
    username: undefined
  }

  authenticate = async () => {
    let auth = new Authentication()
    let token = await auth.loginWithAuth0()
    let userInfo = await auth.getUserInfo(token.access_token)

    let user = await this.getUser(token.access_token, userInfo)

    this.props.UserStore.updateAccessToken(token.access_token)
    this.props.UserStore.updateUserId(user.id)

    this.props.navigation.navigate('App')
  }

  /**
   * TODO: handle response code, navigate to SignUpScreen if 201
   *
   * @memberof SignInScreen
   */
  getUser = async (accessToken, userInfo) => {
    let userResponse = await fetch('http://' + apiUrl + '/ridetime/signin', {
      method: 'POST',
      headers: getHeaders(accessToken),
      body: JSON.stringify(userInfo)
    }).catch((error) => {
      console.log(error.constructor.name, error)
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
        {this.state.username !== undefined
          ? <Text style={styles.title}>Hi {this.state.username}!</Text>
          : <View>
            <Text style={styles.title}>Example: Auth0 login</Text>
            <Button title='Login with Auth0' onPress={this.authenticate} />
          </View>
        }
        <Text>User ID: {this.props.UserStore.userId}</Text>
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
