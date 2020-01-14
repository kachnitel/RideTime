import React from 'react'
import { inject, observer } from 'mobx-react/native'
import { StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { HeaderBackButton, Header } from 'react-navigation'
import TabBar from '../components/TabBar'
import Layout from '../../constants/Layout'
import TabButtonSearch from '../components/TabButtonSearch'
import Colors from '../../constants/Colors'
import LocationMap from '../components/location/LocationMap'
import { Location } from '../stores/LocationStore.mobx'
import LocationList from '../components/location/LocationList'

export default
@inject('LocationStore', 'UserStore')
@observer
class SelectLocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select location',
      headerLeft: <HeaderBackButton onPress={() => navigation.pop()} />
    }
  }

  state = {
    loading: true,
    displayMap: false,
    locations: [],
    searching: false
  }

  componentDidMount = () => {
    this.onSearchUpdate()
  }

  goToRideConfig = (location) => {
    this.props.navigation.push(
      'SelectRouteTrails',
      { location }
    )
  }

  onSearchUpdate = async (val: String) => {
    this.setState({
      loading: true,
      searching: !!val?.length
    })
    let locations = val
      ? await this.props.LocationStore.search(val) // TODO: filter cached then load
      : await this.props.LocationStore.nearby(25)
    this.setState({
      locations: locations,
      loading: false
    })
  }

  onBboxUpdate = async (bbox: Array) => {
    this.loadBbox(bbox)
    let locations = this.props.LocationStore.list().filter((location: Location) => {
      return location.coords[0] > bbox[0] && location.coords[0] < bbox[2] &&
        location.coords[1] > bbox[1] && location.coords[1] < bbox[3]
    })
    this.setState({
      locations: locations
    })
  }

  loadBbox = async (bbox: Array) => {
    this.setState({ loading: true })
    await this.props.LocationStore.bbox(bbox)
    this.setState({ loading: false })
  }

  renderTabBar = () => <TabBar
    options={[
      {
        title: 'List',
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

  getListSections = () => {
    let favourites = this.props.UserStore.currentUser.locations
      .map((id) => this.props.LocationStore.get(id))

    return this.state.searching
      ? [
        {
          title: 'Search locations',
          data: this.state.locations
        }
      ]
      : [
        {
          title: 'Favourite locations',
          data: favourites.slice()
        },
        {
          title: 'Nearby locations',
          data: this.state.locations.filter((location) => !favourites.includes(location))
        }
      ]
  }

  render () {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 24}
        behavior='padding'
        style={styles.container}
      >
        {this.state.displayMap
          ? <LocationMap
            locations={this.state.locations}
            onLocationPress={this.goToRideConfig}
            onBboxUpdate={this.onBboxUpdate}
            // favs?
          />
          : <LocationList
            sections={this.getListSections()}
            onLocationPress={this.goToRideConfig}
          />}
        {this.state.loading && <ActivityIndicator style={styles.loadingIndicator} />}
        {this.renderTabBar()}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  locationPicker: {
    flex: 1
  },
  tabBarButton: {
    width: Layout.window.wp(15),
    color: Colors.tintColor
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: Layout.window.hp(10),
    alignSelf: 'center'
  }
})
