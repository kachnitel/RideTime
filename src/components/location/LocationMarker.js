import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Marker } from 'react-native-maps'
import { MaterialIcons } from '@expo/vector-icons'
import CoverPicture from './CoverPicture'
import Layout from '../../../constants/Layout'
import DifficultyIcon from '../icons/DifficultyIcon'

const LocationMarker = ({ location, onCalloutPress, highlight }) => {
  let latlng = {
    latitude: location.coords[0],
    longitude: location.coords[1]
  }

  return <Marker
    coordinate={latlng}
    title={location.name}
    description={'Tap to select'}
    onCalloutPress={() => onCalloutPress(location.id)}
    anchor={{ x: 0.5, y: 0.5 }}
    tracksViewChanges={false}
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
      {highlight && <MaterialIcons
        name='favorite'
        style={styles.favoriteIcon}
        size={Layout.window.hp(2)}
      />}
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
  },
  favoriteIcon: {
    position: 'absolute',
    top: Layout.window.hp(0.75),
    left: Layout.window.hp(0.75),
    color: 'red'
  }
})
