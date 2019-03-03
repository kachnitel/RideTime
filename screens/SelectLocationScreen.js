import React from 'react'
import { StyleSheet, View } from 'react-native'
import LocationPicker from '../components/new_ride/LocationPicker'
import LocationsProvider from '../providers/LocationsProvider'

export default class SelectLocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      locations: []
    }
  }

  componentDidMount () {
    let locationsProvider = new LocationsProvider()
    locationsProvider.getLocations()
      .then((result) => {
        this.setState({ locations: result })
      })
  }

  render () {
    return (
      <View style={styles.container}>
        {/* Select location here */}
        <LocationPicker
          style={styles.locationPicker}
          navigation={this.props.navigation}
          locations={this.state.locations}
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
  }
})
