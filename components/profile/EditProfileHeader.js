import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import CoverPicture from './CoverPicture';
import ProfilePicture from './ProfilePicture';
import ProfileSummary from './ProfileSummary';
import styles, { profilePictureSize } from './ProfileHeaderStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export default class EditProfileHeader extends React.Component {
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
          <TextInput style={styles.name} underlineColorAndroid='white' value={this.props.user.name} />
          <TextInput style={styles.city} underlineColorAndroid='white' value={this.props.user.city} />
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
    borderColor: 'rgb(133, 193, 49)',
    borderWidth: 1,
    borderRadius: Layout.window.hp(.75),
    textShadowColor: 'rgba(0,0,0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    color: 'rgb(133, 193, 49)',
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
