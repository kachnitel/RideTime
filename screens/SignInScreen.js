import React from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Authentication from '../src/Authentication'
import { observer, inject } from 'mobx-react'

export default
@inject('UserStore')
@observer
class SignInScreen extends React.Component {
  state = {
    username: undefined
  }

  authenticate = async () => {
    let user = await new Authentication().loginWithAuth0()
    this.props.UserStore.updateUserId(user.id)
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
