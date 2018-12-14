import React from 'react';
import { Button, StyleSheet, View, ToastAndroid } from 'react-native';
import RidersProvider from '../providers/RidersProvider';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native';
import EditProfileHeader from '../components/profile/EditProfileHeader';
import ProfileHeader from '../components/profile/ProfileHeader';

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
    if(this.state.editing) {
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
