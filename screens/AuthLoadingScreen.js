import React from 'react'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import { observer, inject } from 'mobx-react'

export default
@inject('UserStore')
@observer
class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // TODO: Refresh if refresh_token is stored,
    // get new access_token, save to store and go to App
    // this.props.UserStore.updateUserId(false) // reset
    let signedInUserId = this.props.UserStore.userId
    let route = signedInUserId ? 'App' : 'Auth'

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(route)
  };

  // Render any loading content that you like here
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
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
