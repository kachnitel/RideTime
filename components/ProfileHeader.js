import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CoverPicture from './CoverPicture';
import Dimensions from '../constants/Layout'
import ProfilePicture from './ProfilePicture';
import Colors from '../constants/Colors';

export default class ProfileHeader extends React.Component {
  render() {
    // console.log(this.props.user.name);
    return(
      <View style={{flex: 1}}>
        <CoverPicture 
          user={this.props.user} 
          style={styles.coverPicture}
        />
        <View style={styles.businessCard}>
          <View style={styles.profilePicture} >
            <ProfilePicture rider={this.props.user} size={120} />
          </View>
          <Text style={styles.name}>{this.props.user.name}</Text>
        </View>
      </View>
    );
  }
}

coverPictureHeight=215/350*Dimensions.window.width;

const styles=StyleSheet.create({
  coverPicture: {
    width: Dimensions.window.width,
    height: coverPictureHeight, 
    position: 'absolute',
  },
  businessCard: {
    backgroundColor: Colors.darkBackground,
    width: 0.8*Dimensions.window.width,
    height: 240,
    top: coverPictureHeight - 120,
    alignSelf: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    marginTop: -60
  },
  name: {
    color: '#fff',
    fontSize: 24,
    padding: 15
  }
});
