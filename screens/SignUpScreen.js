import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { observer, inject } from 'mobx-react'
import SignUpForm from '../components/sign_up/SignUpForm'

export default
@inject('UserStore')
@observer
class SignUpScreen extends React.Component {
  render () {
    let user = this.props.navigation.getParam('user')

    return (
      <View style={styles.container}>
        {/* 2 screens, next / prev button and two dots between, animated
        1st screen confirm name, town
        2nd screen locations, level, bikes,  */}
        <SignUpForm user={user} />
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
