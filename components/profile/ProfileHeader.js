import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CoverPicture from './CoverPicture';
import ProfilePicture from './ProfilePicture';
import ProfileSummary from './ProfileSummary';
import styles, { profilePictureSize } from './ProfileHeaderStyle';

export default class ProfileHeader extends React.Component {
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
          </View>
          <Text style={styles.name}>{this.props.user.name}</Text>
          <Text style={styles.city}>{this.props.user.city}</Text>
          <ProfileSummary style={styles.profileSummary} user={this.props.user} />
        </View>
      </View>
    );
  }
}

