import React from 'react'
import { inject, observer } from 'mobx-react/native'
import { StyleSheet, View } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ButtonIcon from '../components/form/ButtonIcon'
import LocationPicker from '../components/location/LocationPicker'
import Layout from '../../constants/Layout'
import HeaderRightView from '../components/navigation_header/HeaderRightView'

export default
@inject('LocationStore')
@observer
class SelectLocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let displayMap = navigation.getParam('displayMap')
    return {
      title: 'Select location',
      headerLeft: <HeaderBackButton onPress={() => navigation.pop()} />,
      headerRight: <HeaderRightView>
        <ButtonIcon
          text={displayMap ? 'List' : 'Map'}
          iconComponent={<Icon
            name={displayMap ? 'file-search-outline' : 'map-search-outline'}
            color='#fff'
            size={Layout.window.hp(3)}
          />}
          onPress={navigation.getParam('toggleDisplayMap')}
        />
      </HeaderRightView>
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
