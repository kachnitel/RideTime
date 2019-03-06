import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import Authentication from '../src/Authentication'
import { observer, inject } from 'mobx-react'
import { post } from '../src/Connection'
import { SecureStore } from 'expo'
import BulletList from '../components/lists/BulletList'
import TerrainIcon from '../components/icons/TerrainIcon'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import Button from '../components/Button'
import NetworkError from '../src/NetworkError'

export default
@inject('UserStore')
@inject('ApplicationStore')
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

    this.props.ApplicationStore.updateAccessToken(token.access_token)

    post('signin', userInfo)
      .then((responseBody) => this.handleSignIn(responseBody, token))
      // navigate to SignUpScreen if User not found
      .catch((error) => this.maybeSignUpOrError(error, userInfo, token))
  }

  handleSignIn = (signInResponse, token) => {
    if (Number.isInteger(signInResponse.id)) {
      // On successful login save tokens
      SecureStore.setItemAsync('refreshToken', token.refresh_token)

      this.props.UserStore.populateFromApiResponse(signInResponse)
      // Signed in
      console.info(`User ${signInResponse.id} signed in`)
      this.props.navigation.navigate('App')
    } else {
      console.log('Authentication error:', {
        signInResponse: signInResponse,
        token: token
      })
      throw new Error('Invalid user ID:' + signInResponse.id)
    }
  }

  /**
   * Redirect to SignUp if user not found
   * Otherwise throw an Error
   *
   * @param NetworkError error
   *
   * @memberof SignInScreen
   */
  maybeSignUpOrError = (error, userInfo, token) => {
    if (!(error instanceof NetworkError)) {
      throw error
    }

    if (error.body !== undefined && error.statusCode === 404) {
      // Must sign up
      console.info(`Signing up user`, userInfo)

      this.props.navigation.navigate('SignUp', { user: userInfo })
    } else {
      console.log('Sign in failed:', {
        token: token,
        errorMessage: error.message,
        errorCode: error.statusCode,
        errorBody: error.body
      })
      this.setState({ loading: false })
      throw new Error('Error signing in')
    }
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
          <Button title='Get started!' onPress={this.authenticate} />
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
  }
})
