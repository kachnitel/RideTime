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
        <View style={styles.businessCard}>
          <View style={styles.profilePicture} >
            <ProfilePicture rider={this.props.user} size={profilePictureSize} />
            <Icon style={{color: 'white', fontSize: Layout.window.hp(4), position: 'absolute', bottom: 0, right: 0, borderColor: 'white', borderWidth: 1}} name='edit' />
          </View>
          <TextInput style={styles.name} underlineColorAndroid='white' value={this.props.user.name} />
          <TextInput style={styles.city} underlineColorAndroid='white' value={this.props.user.city} />
          <ProfileSummary style={styles.profileSummary} user={this.props.user} />
        </View>
      </View>
    );
  }
}

