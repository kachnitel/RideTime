import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Layout from '../../constants/Layout'
import ProfilePicture from '../profile/ProfilePicture'

export default class RiderItem extends React.Component {
  render () {
    return (
      // Rider should contain his details fetched in list
      // To render eg. little exp. icon in corner of image
      <View style={styles.listItem}>
        <ProfilePicture picture={this.props.rider.picture} size={Layout.window.hp(7)} />
        <Text style={{ ...styles.name, ...this.props.style }} numberOfLines={1} >
          {this.props.rider.name}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: Layout.window.hp(11),
    height: Layout.window.hp(12.5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Layout.window.hp(2)
  },
  name: {
    textAlign: 'center',
    paddingTop: Layout.window.hp(1),
    flex: 1
  }
})
