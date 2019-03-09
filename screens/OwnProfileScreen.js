import React from 'react'
import { StyleSheet, ToastAndroid, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EditProfileHeader from '../components/profile/EditProfileHeader'
import ProfileHeader from '../components/profile/ProfileHeader'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import RidersProvider from '../providers/RidersProvider'
import { observer, inject } from 'mobx-react'
import Button from '../components/Button'
import SignOutButton from '../components/SignOutButton'

/**
 * TODO:
 * Display Profile w/ cached data and a loading icon,
 * replace update state once loaded and hide icon.
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
      headerLeft: (
        <TouchableHighlight
          onPress={() => navigation.toggleDrawer()}>
          <View style={styles.headerMenuIconContainer}>
            <Icon style={styles.headerMenuIcon} name='menu' />
          </View>
        </TouchableHighlight>
      )
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      user: null,
      updatedUser: null,
      editing: false,
      updatedPicture: null
    }
  }

  _editProfile = () => {
    // Done editing and user changed
    if (this.state.editing && (this.state.updatedUser || this.state.updatedPicture)) {
      // TODO this will need to be changed once I add cancel
      this.saveProfile(this.state.updatedUser)
    }
    this.setState((prevState, props) => ({ editing: !prevState.editing }))
  }

  saveProfile = async (updatedUser) => {
    // Only send updated fields
    let update = {}
    for (var key in updatedUser) {
      // skip loop if the property is from prototype
      if (!updatedUser.hasOwnProperty(key)) continue

      if (updatedUser[key] !== this.state.user[key]) {
        update[key] = updatedUser[key]
      }
    }

    let provider = new RidersProvider()
    let userResponse = await provider.updateUser(this.props.UserStore.userId, update)

    if (this.state.updatedPicture) {
      userResponse = await provider.uploadPicture(this.props.UserStore.userId, this.state.updatedPicture)
        .catch((error) => {
          console.warn(error)
          ToastAndroid.show('Error updating picture', ToastAndroid.SHORT)
        })
    }
    this.setState({ user: userResponse })
    this.props.UserStore.populateFromApiResponse(userResponse)
    ToastAndroid.show('User profile saved.', ToastAndroid.SHORT)
  }

  updateUser = (val) => {
    this.setState({ updatedUser: val })
  }

  updatePicture = (val) => {
    this.setState({ updatedPicture: val })
  }

  async componentDidMount () {
    this.props.navigation.setParams({
      editProfile: this._editProfile,
      editing: this.state.editing,
      loadingUser: true
    })

    let userId = this.props.UserStore.userId
    // TODO: Get from STORE
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
    let user = {
      ...this.state.user,
      ...this.state.updatedUser
    }

    if (this.state.updatedPicture) {
      user.picture = this.state.updatedPicture.uri
    }

    return (
      this.state.editing
        ? <EditProfileHeader
          user={user}
          updateCallback={this.updateUser}
          updatePictureCallback={this.updatePicture}
        />
        : this.state.user && <ProfileHeader user={this.state.user} />
    )
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingRight: Layout.window.wp(1),
    flexDirection: 'row'
  },
  navBarButton: {
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
