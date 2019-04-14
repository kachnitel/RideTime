import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Alert
} from 'react-native'
import { observer, inject } from 'mobx-react'
import NetworkError from '../src/NetworkError'

export default
@inject('UserStore')
@inject('ApplicationStore')
@observer
class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let signedInUserId = this.props.ApplicationStore.userId

    if (signedInUserId) {
      await this.props.ApplicationStore.refreshAccessToken()

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
    // This will switch to the Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.ApplicationStore.reset()
    this.props.navigation.navigate('Auth')
  }

  // Render any loading content that you like here
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
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
  }
})
