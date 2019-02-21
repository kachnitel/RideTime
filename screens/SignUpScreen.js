import React from 'react'
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { observer, inject } from 'mobx-react'

export default
@inject('UserStore')
@observer
class SignUpScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Sign up!</Text>
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
