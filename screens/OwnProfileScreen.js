import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import RidersProvider from '../providers/RidersProvider';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native';
import EditProfileHeader from '../components/profile/EditProfileHeader';
import ProfileHeader from '../components/profile/ProfileHeader';

export default class OwnProfileScreen extends React.Component {
  state = {
    editing: false
  };

  _editProfile = () => {
    if(this.state.editing) {
      this.saveProfile();
    }
    this.setState((prevState, props) => ({editing: !prevState.editing}));
  };

  saveProfile = () => {
    alert('Saved!');
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

  render() {
    user = RidersProvider.getUser(1);
    return (
      this.state.editing ? <EditProfileHeader user={user} /> : <ProfileHeader user={user} />
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
    color: '#0C5E14'
  }
});
