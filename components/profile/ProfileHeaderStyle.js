// import React from 'react';
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'

let coverPictureHeight = Layout.window.wp(60)
let businessCardOffset = coverPictureHeight * 0.5

const profilePictureSize = Layout.window.hp(17)
export { profilePictureSize }

const styles = StyleSheet.create({
  coverPicture: {
    width: Layout.window.width,
    height: coverPictureHeight,
    position: 'absolute'
  },
  businessCard: {
    backgroundColor: Colors.darkBackground,
    width: Layout.window.wp(85),
    top: businessCardOffset,
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: businessCardOffset
  },
  profilePicture: {
    marginTop: -profilePictureSize / 2
  },
  name: {
    color: '#fff',
    fontSize: Layout.window.hp(3.75),
    padding: Layout.window.hp(2),
    paddingBottom: Layout.window.hp(0.5)
  },
  hometown: {
    color: '#fff',
    fontSize: Layout.window.hp(2.5)
  },
  profileSummary: {
    paddingTop: Layout.window.hp(1.5),
    flexDirection: 'row'
  }
})

export default styles
