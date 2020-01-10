import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import CoverPicture from './CoverPicture'
import Layout from '../../../constants/Layout'
import DifficultyIcon from '../icons/DifficultyIcon'

const LocationMarker = ({ location, onPress }) => {
  let latlng = {
    latitude: location.coords[0],
    longitude: location.coords[1]
  }

  return <Marker
    coordinate={latlng}
    title={location.name}
    description={'Tap to select'}
    onCalloutPress={() => onPress(location.id)}
    anchor={{ x: 0.5, y: 0.5 }}
  >
    <View style={styles.container}>
      <CoverPicture
        id={location.coverPhoto}
        style={styles.coverPhoto}
      />
      <View style={styles.difficultiesBar}>
        {Object.keys(location.difficulties).map((d) => <View
          key={'diffView_' + location.id + '_' + d}
          style={{
            flex: location.difficulties[d],
            backgroundColor: DifficultyIcon.icons[d].color
          }}
        />)}
      </View>
      <Text
        style={styles.name}
        numberOfLines={1}
      >
        {location.name}
      </Text>
    </View>
  </Marker>
}

export default LocationMarker

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#0006',
    borderRadius: Layout.window.hp(2),
    width: Layout.window.hp(9),
    overflow: 'hidden',
    flex: 1
  },
  coverPhoto: {
    width: '100%',
    aspectRatio: 1.2,
    resizeMode: 'cover'
  },
  name: {
    fontSize: Layout.window.hp(1.5),
    color: '#fff',
    paddingHorizontal: Layout.window.wp(1),
    height: Layout.window.hp(3)
  },
  difficultiesBar: {
    width: '100%',
    flexDirection: 'row',
    height: '5%'
  }
})
