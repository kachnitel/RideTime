import React from 'react'
import { StyleSheet, View } from 'react-native'
import LocationPicker from '../components/new_ride/LocationPicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Layout from '../constants/Layout'
import ButtonIcon from '../components/ButtonIcon'

export default class SelectLocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // FIXME: button doesn't change
    let displayMap = navigation.getParam('displayMap')
    return {
      title: 'Select location',
      headerRight: <ButtonIcon
        text={displayMap ? 'List' : 'Map'}
        iconComponent={<Icon
          name={displayMap ? 'file-search-outline' : 'map-search-outline'}
          color='#fff'
          size={Layout.window.hp(4.5)}
        />}
        onPress={navigation.getParam('toggleDisplayMap')}
      />
    }
  }

  state = {
    displayMap: false
  }

  toggleDisplayMap = async () => {
    await this.setState((prevState) => ({ displayMap: !prevState.displayMap }))
    this.props.navigation.setParams({ displayMap: this.state.displayMap })
  }

  componentDidMount () {
    this.props.navigation.setParams({
      toggleDisplayMap: this.toggleDisplayMap,
      displayMap: this.state.displayMap
    })
  }

  goToRideConfig = (locationId) => {
    let location = this.props.LocationStore.getSync(locationId)

    this.props.navigation.push(
      'CreateRide',
      location
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <LocationPicker
          style={styles.locationPicker}
          displayMap={this.state.displayMap}
          onLocationPress={this.goToRideConfig}
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
