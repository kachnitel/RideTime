import React from 'react'
import { inject, observer } from 'mobx-react/native'
import { StyleSheet, View } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import LocationPicker from '../components/location/LocationPicker'
import TabBar from '../components/TabBar'

export default
@inject('LocationStore')
@observer
class SelectLocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select location',
      headerLeft: <HeaderBackButton onPress={() => navigation.pop()} />
    }
  }

  state = {
    displayMap: false
  }

  goToRideConfig = (locationId) => {
    let location = this.props.LocationStore.get(locationId)

    this.props.navigation.push(
      'SelectRouteTrails',
      { location }
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <LocationPicker
          style={styles.locationPicker}
          displayMap={this.state.displayMap}
          onLocationPress={this.goToRideConfig}
          showFavourites
        />
        <TabBar
          options={[
            {
              title: 'Nearby',
              onPress: () => this.setState({ displayMap: false }),
              icon: 'list'
            },
            {
              title: 'Map',
              onPress: () => this.setState({ displayMap: true }),
              icon: 'map'
            }
          ]}
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
