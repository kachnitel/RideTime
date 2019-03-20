import React from 'react'
import {
  StyleSheet,
  ToastAndroid,
  View,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native'
import EditProfileHeader from '../components/profile/EditProfileHeader'
import ProfileHeader from '../components/profile/ProfileHeader'
import Layout from '../constants/Layout'
import { observer, inject, Provider } from 'mobx-react/native'
import Button from '../components/Button'
import SignOutButton from '../components/SignOutButton'
import { Header } from 'react-navigation'
import DrawerButton from '../components/DrawerButton'
import { User } from '../stores/UserStore.mobx'

export default
@inject('UserStore')
@inject('ApplicationStore')
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
              title={navigation.getParam('editing') ? 'Save' : 'Edit'}
              // default value suppresses warning thrown before param is obtained
              onPress={navigation.getParam('editProfile', () => {})}
              disabled={navigation.getParam('loadingUser', true)}
            />
          </View>
          <View style={styles.navBarButton}>
            <SignOutButton navigation={navigation} />
          </View>
        </View>
      ),
      headerLeft: <DrawerButton navigation={navigation} />
    }
  }

  user: User

  constructor (props) {
    super(props)

    this.state = {
      editing: false
    }

    this.user = new User(props.UserStore)
  }

  _editProfile = () => {
    // Done editing
    if (this.state.editing) {
      // TODO: this will need to be changed once I add cancel
      this.saveProfile()
    }
    this.setState((prevState, props) => ({ editing: !prevState.editing }))
  }

  saveProfile = async () => {
    await this.props.UserStore.update(this.user)

    ToastAndroid.show('User profile saved.', ToastAndroid.SHORT)
  }

  async componentDidMount () {
    this.props.navigation.setParams({
      editProfile: this._editProfile,
      editing: this.state.editing,
      loadingUser: true
    })

    let originalUser = await this.props.UserStore.get(this.props.ApplicationStore.userId)
    // REVIEW: bit dirty trick to "clone" the user
    this.user.populateFromApiResponse(originalUser.createApiJson())

    this.props.navigation.setParams({ loadingUser: false })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.editing !== this.state.editing) {
      this.props.navigation.setParams({
        editing: this.state.editing
      })
    }
  }

  render () {
    let user = this.user

    // TODO: Should be part of user (track if pic updated and upload as needed)
    // - [x] move this to user/could use tempPicture?
    //   - [x] then User.picture shows updated if set
    // - [x] then remove from SignUpScreen
    // - [ ] do not send in UserStore updateUser if not updated

    return (
      user.id
        ? <Provider User={user}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={Header.HEIGHT + 24}
            behavior='padding'
          >
            { this.state.editing
              ? <EditProfileHeader />
              : <ProfileHeader user={user} /> }
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
