import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'
import ProfilePicture from '../profile/ProfilePicture'

const UserMarker = ({ coords, user, color, onCalloutPress }) => {
  let latlng = {
    latitude: coords[0],
    longitude: coords[1]
  }

  return <Marker
    coordinate={latlng}
    title={user.name}
    anchor={{ x: 0.5, y: 0.5 }}
    onCalloutPress={() => onCalloutPress(user)}
    tracksViewChanges={false}
  >
    <View style={{
      ...styles.container,
      backgroundColor: color ?? Colors.darkBackgroundTransparent,
      borderColor: color ?? Colors.darkBackgroundTransparent
    }}>
      <ProfilePicture
        style={styles.picture}
        picture={user.picture}
      />
    </View>
  </Marker>
}

export default UserMarker

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: Layout.window.hp(2.5),
    width: Layout.window.hp(5),
    borderWidth: Layout.window.hp(0.25),
    aspectRatio: 1,
    overflow: 'hidden',
    flex: 1
  },
  picture: {
    width: '100%',
    resizeMode: 'cover'
  }
})
