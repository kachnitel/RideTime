import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CoverPicture from './CoverPicture';
import ProfilePicture from './ProfilePicture';
import ProfileSummary from './ProfileSummary';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

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
            <ProfilePicture rider={this.props.user} size={Layout.window.hp(17)} />
          </View>
          <Text style={styles.name}>{this.props.user.name}</Text>
          <Text style={styles.city}>{this.props.user.city}</Text>
          <ProfileSummary user={this.props.user} />
        </View>
      </View>
    );
  }
}

coverPictureHeight = Layout.window.wp(60);
businessCardHeight = Layout.window.hp(33);
businessCardOffset = coverPictureHeight - businessCardHeight/2;

const styles=StyleSheet.create({
  coverPicture: {
    width: Layout.window.width,
    height: coverPictureHeight,
    position: 'absolute',
  },
  businessCard: {
    backgroundColor: Colors.darkBackground,
    width: Layout.window.wp(85),
    height: businessCardHeight,
    top: businessCardOffset,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: businessCardOffset
  },
  profilePicture: {
    marginTop: -Layout.window.hp(8.5)
  },
  name: {
    color: '#fff',
    fontSize: Layout.window.hp(3.75),
    padding: Layout.window.hp(2),
    paddingBottom: Layout.window.hp(.5)
  },
  city: {
    color: '#fff',
    fontSize: Layout.window.hp(2.5),
  }
});
