import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProfileHeader from './ProfileHeader';

export default class Profile extends React.Component {
  render() {
    return(
      <ProfileHeader user={this.props.user} />
    );
  }
}

