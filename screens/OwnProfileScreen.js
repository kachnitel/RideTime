import React from 'react'
import { Button, StyleSheet, ToastAndroid, TouchableHighlight, View, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EditProfileHeader from '../components/profile/EditProfileHeader'
import ProfileHeader from '../components/profile/ProfileHeader'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import RidersProvider from '../providers/RidersProvider'
import { observer, inject } from 'mobx-react'
import { SecureStore } from 'expo'

/**
 * TODO:
 * Display Profile w/ cached data and a loading icon,
 * replace update state once loaded and hide icon.
 * Disable edit while offline/loading? (w/ Toast onPress)
 */
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
          {/* TODO: Button & SignOutButton (navigation as a prop, owns _signOut) components */}
          <View style={styles.button}>
            <Button
              title={navigation.getParam('editing') ? 'Save' : 'Edit'}
              // default value suppresses warning thrown before param is obtained
              onPress={navigation.getParam('editProfile', () => {})}
              color={Colors.tintColor}
              disabled={navigation.getParam('loadingUser', true)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title='Sign out'
              // default value suppresses warning thrown before param is obtained
              onPress={navigation.getParam('signOut', () => {})}
              color={Colors.tintColor}
              style={styles.button}
            />
          </View>
        </View>
      ),
      headerLeft: (
        <TouchableHighlight
          onPress={() => navigation.toggleDrawer()}>
          <View style={styles.headerMenuIconContainer}>
            <Icon style={styles.headerMenuIcon} name='menu' />
          </View>
        </TouchableHighlight>
      )
    }
  };

  constructor (props) {
    super(props)

    this.state = {
      user: null,
      updatedUser: null,
      editing: false
    }
  }

  _editProfile = () => {
    // Done editing and user changed
    if (this.state.editing && this.state.updatedUser) {
      // TODO this will need to be changed once I add cancel
      this.saveProfile(this.state.updatedUser)
    }
    this.setState((prevState, props) => ({ editing: !prevState.editing }))
  }

  _signOut = () => {
    console.info(`User ${this.props.UserStore.userId} signing out`)
    Alert.alert(
      'Sign out',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.info('Sign out cancelled'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            SecureStore.deleteItemAsync('refreshToken')
            this.props.UserStore.reset()

            this.props.navigation.navigate('Auth')
          }
        }
      ],
      { onDismiss: () => console.info('Sign out cancelled') }
    )
  }

  saveProfile = (updatedUser) => {
    // TODO: Only send updated fields (name, town, picture,...)
    let update = {}
    for (var key in updatedUser) {
      // skip loop if the property is from prototype
      if (!updatedUser.hasOwnProperty(key)) continue

      if (updatedUser[key] !== this.state.user[key]) {
        update[key] = updatedUser[key]
      }
    }
    let provider = new RidersProvider()
    provider.updateUser(this.props.UserStore.userId, update)
      .then((result) => {
        this.setState({ user: updatedUser })
        this.props.UserStore.updateName(updatedUser.name) // TODO: all that is stored in UserStore..
        this.props.UserStore.updateProfilePic(updatedUser.picture)
        ToastAndroid.show('User profile saved.', ToastAndroid.SHORT)
      })
  }

  updateUser = (val) => {
    this.setState({ updatedUser: val })
  }

  async componentDidMount () {
    this.props.navigation.setParams({
      signOut: this._signOut,
      editProfile: this._editProfile,
      editing: this.state.editing,
      loadingUser: true
    })

    let userId = this.props.UserStore.userId
    let provider = new RidersProvider()
    await provider.getUser(userId)
      .then((result) => {
        this.setState({ user: result })
      })
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
    return (
      this.state.editing
        ? <EditProfileHeader user={this.state.user} updateCallback={this.updateUser} />
        : this.state.user && <ProfileHeader user={this.state.user} />
    )
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingRight: Layout.window.wp(1),
    flexDirection: 'row'
  },
  button: {
    margin: Layout.window.wp(1)
  },
  headerMenuIconContainer: {
    justifyContent: 'center'
  },
  headerMenuIcon: {
    fontSize: 24,
    paddingLeft: 15,
    color: Colors.tintColor
  }
})
