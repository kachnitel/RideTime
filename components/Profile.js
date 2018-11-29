import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CoverPicture from './CoverPicture';
import Dimensions from '../constants/Layout'
import ProfilePicture from './ProfilePicture';
import Colors from '../constants/Colors';
import ProfileHeader from './ProfileHeader';

export default class Profile extends React.Component {
  render() {
    // console.log(this.props.user.name);
    return(
      <ProfileHeader user={this.props.user} />
    );
  }
}

