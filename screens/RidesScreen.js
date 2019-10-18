import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import AreaMap from '../components/AreaMap'
import { CreateRideButton } from '../components/CreateRideButton'
import RidesList from '../components/lists/RidesList'
import DrawerButton from '../components/DrawerButton'
import { observer, inject } from 'mobx-react/native'
import TouchableWithModal from '../components/TouchableWithModal'
import InvitesList from '../components/lists/InvitesList'
import InvitesIconBadged from '../components/InvitesIconBadged'
import { Marker } from 'react-native-maps'

/**
 * TODO:
 * - get rides for user - public(*) + friends/groups allowed (* - once privacy is implemented)
 * - filter by location (when a location is selected/Callout is open in map)
 * - display future rides in view when map is moved (see LocationsPicker)
 *
 * @export
 * @class RidesScreen
 * @extends {React.Component}
 */
export default
@inject('EventStore', 'LocationStore')
@observer
class RidesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
      title: 'RideTime',
      drawerLabel: 'Home',
      headerLeft: <DrawerButton navigation={navigation} />,
      headerRight: <TouchableWithModal
        modalContent={<InvitesList />}
      >
        <InvitesIconBadged />
      </TouchableWithModal>
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  async componentDidMount () {
    await this.loadRides()
  }

  onRidesRefresh = () => {
    this.loadRides()
  }

  async loadRides () {
    this.setState({ loading: true })
    await this.props.EventStore.populate()
    this.setState({ loading: false })
  }

  mapMarkers () {
    // TODO: proper filter by mapview or rides in list below
    let events = this.props.EventStore.list()

    let locations = []
    events.map((event) => {
      let location = event.location

      let existing = locations.find((loc) => loc.id === location.id)
      if (existing) {
        existing.count++
        return
      }

      locations.push({
        id: location.id,
        latLng: {
          latitude: location.gps[0],
          longitude: location.gps[1]
        },
        name: location.name,
        count: 1
      })
      // return <Marker
      //   coordinate={latlng}
      //   title={location.name}
      //   key={location.id}
      //   // description={marker.description}
      //   // onCalloutPress={() => this.goToRide(event)} // TODO:
      // />
    })

    return locations.map((locationInfo) => <Marker
      coordinate={locationInfo.latLng}
      key={locationInfo.id}
      title={locationInfo.name}
    >
      <Text style={{backgroundColor: 'red'}}>{locationInfo.name}: {locationInfo.count}</Text>
    </Marker>)
  }

  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 35 }}>
          <AreaMap
            markers={this.mapMarkers()}
          />
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
