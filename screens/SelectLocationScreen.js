import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LocationPicker from '../components/new_ride/LocationPicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

export default class SelectLocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    console.log('NAVOPTS')
    return {
      title: 'Select location',
      headerRight: <Icon.Button
        name='map-search-outline'
        style={styles.mapButton}
        size={Layout.window.hp(4.5)}
        // onPress={() => this.setState((prevState) => ({ map: !prevState.map }))}
        onPress={() => console.log('map')}
      >
        <Text style={styles.mapButtonText}>Map</Text>
      </Icon.Button>
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <LocationPicker
          style={styles.locationPicker}
          navigation={this.props.navigation}
        />
        {/* Next button? */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
    // paddingTop: Constants.statusBarHeight // TODO enable once header is disabled
  },
  locationPicker: {
    flex: 1
  },
  mapButton: {
    backgroundColor: Colors.tintColor,
    color: '#fff'
  },
  mapButtonText: {
    fontSize: Layout.window.hp(3),
    color: '#fff'
  }
})
