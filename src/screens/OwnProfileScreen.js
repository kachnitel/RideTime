import React from 'react'
import {
  StyleSheet,
  ToastAndroid,
  View,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native'
import { observer, inject, Provider } from 'mobx-react/native'
import { Header, HeaderBackButton } from 'react-navigation'
import EditProfileHeader from '../components/profile/EditProfileHeader'
import Layout from '../../constants/Layout'
import Button from '../components/form/Button'
import SignOutButton from '../components/SignOutButton'
import HeaderRightView from '../components/navigation_header/HeaderRightView'
import { User } from '../stores/UserStore.mobx'

export default
@inject('UserStore')
@observer
class OwnProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Profile',
      headerRight: (
        <HeaderRightView>
          <View style={styles.navBarButton}>
            <Button
              title={'Save'}
              onPress={navigation.getParam('saveProfile')}
              disabled={navigation.getParam('loadingUser')}
            />
          </View>
          <View style={styles.navBarButton}>
            <SignOutButton navigation={navigation} />
          </View>
        </HeaderRightView>
      ),
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('App')} />
    }
  }

  user: User

  constructor (props) {
    super(props)

    this.user = new User(props.UserStore)
    props.navigation.setParams({
      saveProfile: this.saveProfile,
      loadingUser: true
    })
  }

  saveProfile = async () => {
    await this.props.UserStore.update(this.user)

    ToastAndroid.show('User profile saved.', ToastAndroid.SHORT)
  }

  async componentDidMount () {
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
  navBarButton: {
    margin: Layout.window.wp(1)
  }
})
