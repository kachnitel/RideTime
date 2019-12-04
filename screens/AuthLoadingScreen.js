import { inject, observer } from 'mobx-react'
import React from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Colors from '../constants/Colors'
import NetworkError from '../src/NetworkError'

export default
@inject('UserStore')
@inject('ApplicationStore')
@observer
class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loadingText: 'Loading...'
    }
  }

  componentDidMount = () => {
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let signedInUserId = this.props.ApplicationStore.userId

    this.setState({ loadingText: 'Refreshing token...' })
    if (signedInUserId) {
      try {
        await this.props.ApplicationStore.refreshAccessToken()
      } catch (error) {
        console.warn(await error.body)
        Alert.alert('Error refreshing token')
        this.resetAuth()
        return
      }

      this.setState({ loadingText: 'Loading user...' })
      let user = await this.props.UserStore.get(signedInUserId)
        .catch(async (error) => {
          // Custom catch to allow redirect
          Alert.alert('Error loading account ID: ' + signedInUserId)
          if (error instanceof NetworkError) {
            console.warn(await error.body)
          } else {
            throw error
          }
        })

      if (user !== undefined) {
        this.props.navigation.navigate('App')
        return
      }
    }

    this.resetAuth()
  }

  /**
   * This will switch to the Auth screen and this loading
   * screen will be unmounted and thrown away.
   *
   * @memberof AuthLoadingScreen
   */
  resetAuth = () => {
    this.props.ApplicationStore.reset()
    this.props.navigation.navigate('Auth')
  }

  // Render any loading content that you like here
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>{this.state.loadingText}</Text>
        <ActivityIndicator color={Colors.tintColor} />
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
    color: '#fff'
  }
})
