import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import ProfilePicture from './ProfilePicture'
import ProfileSummary from './ProfileSummary'

export default class ProfileHeader extends React.Component {
  render () {
    return (
      <View>
        <Image // TODO:
          source={{ uri: 'https://s3.ca-central-1.amazonaws.com/ride-time/cover-images/1.png' }}
          style={styles.coverPicture}
        />
        <View style={styles.businessCard}>
          {/* <View style={styles.profilePicture}> */}
          <ProfilePicture picture={this.props.user.picture} style={styles.profilePicture} />
          {/* </View> */}
          <Text style={styles.name}>{this.props.user.name}</Text>
          <Text style={styles.hometown}>{this.props.user.hometown}</Text>
          <ProfileSummary style={styles.profileSummary} user={this.props.user} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  coverPicture: {
    width: '100%',
    aspectRatio: 1.4
  },
  businessCard: {
    backgroundColor: Colors.darkBackground,
    width: '85%',
    marginTop: '-33%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: Layout.window.hp(4)
  },
  profilePicture: {
    width: '40%',
    marginTop: '-20%'
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
