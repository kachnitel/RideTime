// import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

coverPictureHeight = Layout.window.wp(60);
businessCardHeight = Layout.window.hp(33);
businessCardOffset = coverPictureHeight - businessCardHeight/2;

const profilePictureSize = Layout.window.hp(17);
export { profilePictureSize };

const styles = StyleSheet.create({
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
    marginTop: -profilePictureSize/2
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
  },
  profileSummary: {
    bottom: Layout.window.hp(3.5),
    position: 'absolute',
    flexDirection: 'row'
  }
});

export default styles;
