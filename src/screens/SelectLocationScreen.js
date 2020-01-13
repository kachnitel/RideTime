import React from 'react'
import { inject, observer } from 'mobx-react/native'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { HeaderBackButton, Header } from 'react-navigation'
import LocationPicker from '../components/location/LocationPicker'
import TabBar from '../components/TabBar'
import Layout from '../../constants/Layout'
import TabButtonSearch from '../components/TabButtonSearch'
import Colors from '../../constants/Colors'

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
    displayMap: false,
    locations: []
  }

  componentDidMount = () => {
    this.onSearchUpdate()
  }

  goToRideConfig = (locationId) => {
    let location = this.props.LocationStore.get(locationId)

    this.props.navigation.push(
      'SelectRouteTrails',
      { location }
    )
  }

  onSearchUpdate = async (val: String) => {
    let locations = val
      ? await this.props.LocationStore.search(val)
      : await this.props.LocationStore.nearby(25)
    this.setState({ locations: locations })
  }

  render () {
    return (
      <KeyboardAvoidingView

        keyboardVerticalOffset={Header.HEIGHT + 24}
        behavior='padding'
        style={styles.container}
      >
        <LocationPicker
          style={styles.locationPicker}
          displayMap={this.state.displayMap}
          onLocationPress={this.goToRideConfig}
          showFavourites
          locations={this.state.locations}
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
        >
          <TabButtonSearch
            style={styles.tabBarButton}
            icon='search'
            title='Search'
            onUpdate={this.onSearchUpdate}
          />
        </TabBar>
      </KeyboardAvoidingView>
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
  tabBarButton: {
    width: Layout.window.wp(15),
    color: Colors.tintColor
  }
})
