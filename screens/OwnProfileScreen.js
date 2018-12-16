import React from 'react';
import { Button, StyleSheet, ToastAndroid, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditProfileHeader from '../components/profile/EditProfileHeader';
import ProfileHeader from '../components/profile/ProfileHeader';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import RidersProvider from '../providers/RidersProvider';

/**
 * TODO:
 * Display Profile w/ cached data and a loading icon,
 * replace update state once loaded and hide icon.
 * Disable edit while offline/loading? (w/ Toast onPress)
 */
export default class OwnProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // w/ little name under in drawer eventually
      title: 'My Profile',
      headerRight: (
        <View style={styles.button}>
          <Button
            title={navigation.getParam('editing') ? 'Save' : 'Edit'}
            onPress={navigation.getParam('editProfile')}
            color={Colors.tintColor}
            // disabled={navigation.getParam('loading', false)} // NYI
          />
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
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      user: RidersProvider.getUser(1),
      updatedUser: null,
      editing: false
    };
  }

  _editProfile = () => {
    // Done editing and user changed
    if(this.state.editing && this.state.updatedUser) {
      // TODO this will need to be changed once I add cancel
      this.saveProfile(this.state.updatedUser);
    }
    this.setState((prevState, props) => ({editing: !prevState.editing}));
  };

  saveProfile = (val) => {
    console.log('TODO: User Save');
    console.log(val);
    this.setState({user: val});
    ToastAndroid.show('User profile saved.', ToastAndroid.SHORT);
  }

  updateUser = (val) => {
    this.setState({updatedUser: val})
  }

  componentDidMount() {
    this.props.navigation.setParams({
      editProfile: this._editProfile,
      editing: this.state.editing
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.editing !== this.state.editing) {
      this.props.navigation.setParams({
        editing: this.state.editing
      })
    }
  }

  render() {
    return (
      this.state.editing
        ? <EditProfileHeader user={this.state.user} updateCallback={this.updateUser} />
        : <ProfileHeader user={this.state.user} />
    );
  };
}

const styles = StyleSheet.create({
  button: {
    paddingRight: Layout.window.wp(2),
  },
  headerMenuIconContainer: {
    justifyContent: 'center'
  },
  headerMenuIcon: {
    fontSize: 24,
    paddingLeft: 15,
    color: Colors.tintColor
  }
});
