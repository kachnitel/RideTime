import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { observer, inject } from 'mobx-react'
import BasicInfoForm from '../components/sign_up/BasicInfoForm'
import Colors from '../constants/Colors'

export default
@inject('UserStore')
@observer
class SignUpScreen extends React.Component {
  componentDidMount = () => {
    let user = this.props.navigation.getParam('user')
    user.name !== user.email && this.props.UserStore.updateName(user.name)
    this.props.UserStore.updateTempPicture(user.picture)
    this.props.UserStore.updateEmail(user.email)
  }

  render () {
    return (
      <View style={styles.container}>
        {/* 2 screens, next / prev button and two dots between, animated
        1st screen confirm name, town
        2nd screen locations, level, bikes

        TODO:
        once submitted
        RidersProvider.signUp
        POST /signUp
        On submit upload UserStore.tempPicture
        (send URL in POST body or upload image if local)
        Separate from 'user' object
        Server processes the image (saves to storage)
        and returns user with updated 'picture'

        reset UserStore and populate from signed in user
        */}
        <BasicInfoForm />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: Colors.darkBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40
  }
})
