import React from 'react'
import { View } from 'react-native'
import { AreaMap } from '../components/AreaMap'
import { CreateRideButton } from '../components/CreateRideButton'
import RidesList from '../components/lists/RidesList'
import LocationsProvider from '../providers/LocationsProvider'
import RidesProvider from '../providers/RidesProvider'
import DrawerButton from '../components/DrawerButton'

/**
 * TODO:
 * get rides for user - public + friends/groups allowed
 * filter by location (when a location is selected)
 *
 * @export
 * @class RidesScreen
 * @extends {React.Component}
 */
export default class RidesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
      title: 'RideTime',
      drawerLabel: 'Home',
      headerLeft: <DrawerButton navigation={navigation} />
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      locations: [],
      rides: []
    }
  }

  componentDidMount () {
    this.loadRides()

    let locationsProvider = new LocationsProvider()
    locationsProvider.list()
      .then((result) => {
        this.setState({ locations: result })
      })

    this.subs = [
      // Adds listener to reload rides when screen is focused
      // But why this.subs? FIXME: test w/o the assignment
      this.props.navigation.addListener('didFocus', this.componentDidFocus)
    ]
  }

  componentDidFocus = () => {
    this.loadRides()
  }

  onRidesRefresh = () => {
    this.loadRides()
  }

  loadRides () {
    let ridesProvider = new RidesProvider()
    ridesProvider.list()
      .then((result) => {
        this.setState({ rides: result })
      })
  }

  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 35 }}>
          <AreaMap locations={this.state.locations} />
        </View>

        <View style={{ flex: 65 }}>
          <RidesList
            rides={this.state.rides}
            navigation={this.props.navigation}
            onRefresh={this.onRidesRefresh}
          />
        </View>

        <CreateRideButton navigation={this.props.navigation} />
      </View>
    )
  }
}
