import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { AreaMap } from '../components/AreaMap'
import { CreateRideButton } from '../components/CreateRideButton'
import RidesList from '../components/lists/RidesList'
import LocationsProvider from '../providers/LocationsProvider'
import DrawerButton from '../components/DrawerButton'
import { observer, inject } from 'mobx-react/native'

/**
 * TODO:
 * get rides for user - public + friends/groups allowed
 * filter by location (when a location is selected)
 *
 * @export
 * @class RidesScreen
 * @extends {React.Component}
 */
export default
@inject('EventStore')
@observer
class RidesScreen extends React.Component {
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
      loading: true
    }
  }

  async componentDidMount () {
    await this.loadRides()

    let locationsProvider = new LocationsProvider()
    locationsProvider.list()
      .then((result) => {
        this.setState({ locations: result })
      })
  }

  onRidesRefresh = () => {
    this.loadRides()
  }

  async loadRides () {
    this.setState({ loading: true })
    await this.props.EventStore.populate()
    this.setState({ loading: false })
  }

  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 35 }}>
          <AreaMap locations={this.state.locations} />
        </View>

        <View style={{ flex: 65 }}>
          {this.state.loading ? <ActivityIndicator /> : <RidesList
            navigation={this.props.navigation}
            onRefresh={this.onRidesRefresh}
          />}
        </View>

        <CreateRideButton navigation={this.props.navigation} />
      </View>
    )
  }
}
