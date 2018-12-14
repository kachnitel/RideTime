import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import CoverPicture from './CoverPicture';
import ProfilePicture from './ProfilePicture';
import ProfileSummary from './ProfileSummary';
import styles, { profilePictureSize } from './ProfileHeaderStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '../../constants/Layout';

export default class EditProfileHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user
    };
  }

  handleUpdateName = (val) => {
    this.handleUpdate(val, 'name');
  }

  handleUpdateCity = (val) => {
    this.handleUpdate(val, 'city');
  }

  handleUpdate = async (val, key) => {
    await this.setState(
      (prevState) => ({user: {...prevState.user, [key]: val}})
    )
    this.props.updateCallback(this.state.user);
  }

  render() {
    return(
      <View>
        <CoverPicture
          user={this.props.user}
          style={styles.coverPicture}
        />
        <Icon
          name='edit'
          style={{
            ...editStyles.editIcon, ...editStyles.editIconCoverPicture
          }}
        />
        <View style={styles.businessCard}>
          <View style={styles.profilePicture} >
            <ProfilePicture rider={this.props.user} size={profilePictureSize} />
            <Icon
              name='edit'
              style={{
                ...editStyles.editIcon, ...editStyles.editIconProfilePicture
              }}
            />
          </View>
          <TextInput
            style={styles.name}
            underlineColorAndroid='white'
            textAlign={'center'}
            value={this.state.user.name}
            onChangeText={this.handleUpdateName}
            placeholder='Your name'
            placeholderTextColor='gray'
          />
          <TextInput
            style={styles.city}
            underlineColorAndroid='white'
            textAlign={'center'}
            value={this.state.user.city}
            onChangeText={this.handleUpdateCity}
            placeholder='Hometown, BC'
            placeholderTextColor='gray'
          />
          <ProfileSummary style={styles.profileSummary} user={this.props.user} />
        </View>
      </View>
    );
  }
}

const editStyles = StyleSheet.create({
  editIcon: {
    fontSize: Layout.window.hp(5),
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: Layout.window.hp(.75),
    textShadowColor: 'rgba(0,0,0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.75);',
    right: 5
  },
  editIconProfilePicture: {
    bottom: 5
  },
  editIconCoverPicture: {
    top: 5
  }
})
