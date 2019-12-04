import React from 'react'
import {
  StyleSheet,
  ToastAndroid,
  View,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native'
import EditProfileHeader from '../components/profile/EditProfileHeader'
import Layout from '../constants/Layout'
import { observer, inject, Provider } from 'mobx-react/native'
import Button from '../components/Button'
import SignOutButton from '../components/SignOutButton'
import { Header } from 'react-navigation'
import BackButton from '../components/BackButton'
import { User } from '../stores/UserStore.mobx'

export default
@inject('UserStore')
@observer
class OwnProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // w/ little name under in drawer eventually
      title: 'My Profile',
      headerRight: (
        <View style={styles.buttonContainer}>
          <View style={styles.navBarButton}>
            <Button
              title={'Save'}
              // default value suppresses warning thrown before param is obtained
              onPress={navigation.getParam('saveProfile', () => {})}
              disabled={navigation.getParam('loadingUser', true)}
            />
          </View>
          <View style={styles.navBarButton}>
            <SignOutButton navigation={navigation} />
          </View>
        </View>
      ),
      headerLeft: <BackButton navigation={navigation} />
    }
  }

  user: User

  constructor (props) {
    super(props)

    this.user = new User(props.UserStore)
  }

  saveProfile = async () => {
    await this.props.UserStore.update(this.user)

    ToastAndroid.show('User profile saved.', ToastAndroid.SHORT)
  }

  async componentDidMount () {
    this.props.navigation.setParams({
      saveProfile: this.saveProfile,
      loadingUser: true
    })

    let originalUser = await this.props.UserStore.currentUser
    // REVIEW: bit dirty trick to "clone" the user
    this.user.populateFromApiResponse(originalUser.createApiJson())

    this.props.navigation.setParams({ loadingUser: false })
  }

  render () {
    let user = this.user

    return (
      user.id
        ? <Provider User={user}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={Header.HEIGHT + 24}
            behavior='padding'
          >
            <EditProfileHeader />
          </KeyboardAvoidingView>
        </Provider>
        : <ActivityIndicator />
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingRight: Layout.window.wp(1),
    flexDirection: 'row'
  },
  navBarButton: {
    margin: Layout.window.wp(1)
  }
})
