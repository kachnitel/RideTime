import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { Marker, Callout } from 'react-native-maps'
import AreaMap from '../components/location/AreaMap'
import { CreateRideButton } from '../components/ride/new_ride/CreateRideButton'
import RidesList from '../components/ride/RidesList'
import DrawerButton from '../components/navigation_header/DrawerButton'
import TouchableWithModal from '../components/modal/TouchableWithModal'
import InvitesList from '../components/ride/InvitesList'
import InvitesIconBadged from '../components/InvitesIconBadged'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import Header from '../components/Header'
import DifficultyIcon from '../components/icons/DifficultyIcon'
import CountBadge from '../components/CountBadge'
import HeaderRightView from '../components/navigation_header/HeaderRightView'
import { Event } from '../stores/EventStore.mobx'
import { Location } from '../stores/LocationStore.mobx'
import TabBar from '../components/TabBar'

/**
 * TODO:
 * - get rides for user - public(*) + friends/groups allowed (* - once privacy is implemented)
 *
 * @export
 * @class RidesScreen
 * @extends {React.Component}
 */
export default
@inject('EventStore', 'LocationStore', 'UserStore')
@observer
class RidesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
      title: 'RideTime',
      headerLeft: <DrawerButton navigation={navigation} />,
      headerRight: <HeaderRightView>
        <TouchableWithModal
          modalContent={<InvitesList />}
        >
          <InvitesIconBadged />
        </TouchableWithModal>
      </HeaderRightView>
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      bbox: null,
      visibleLocations: [],
      selectedLocation: null,
      tab: 'map'
    }
  }

  /**
   * REVIEW: Duplicated from LocationsPicker - use AreaMap?
   *
   * @param {*} region
   * @memberof RidesScreen
   */
  onRegionChange = (region) => {
    let bbox = [
      region.latitude - region.latitudeDelta / 2, // southLat - min lat
      region.longitude - region.longitudeDelta / 2, // westLng - min lng
      region.latitude + region.latitudeDelta / 2, // northLat - max lat
      region.longitude + region.longitudeDelta / 2 // eastLng - max lng
    ]
    if (JSON.stringify(bbox) === JSON.stringify(this.state.bbox)) {
      return
    }
    this.setState({ bbox: bbox })
    this.refresh(bbox)
  }

  refresh = async (bbox: Array) => {
    this.setState({ loading: true })

    let locations = await this.props.LocationStore.filter(
      { bbox: bbox },
      {
        related: 'event',
        eventFilter: {
          dateStart: (Math.floor(Date.now() / 1000) - 3600)
        }
      }
    )

    this.setState({
      visibleLocations: locations,
      loading: false
    })
  }

  selectLocation = (location: Location) => {
    this.setState({ selectedLocation: location })
  }

  clearLocation = () => {
    this.setState({ selectedLocation: null })
  }

  mapMarkers (events: Event[]) {
    return this.state.visibleLocations.map((location: Location) => {
      let badgeCount = location.events
        .filter((event: Event) => events.includes(event)) // Filters currently filtered events (my, friends)
        .length
      return <Marker
        coordinate={{
          latitude: location.coords[0],
          longitude: location.coords[1]
        }}
        key={location.id}
        title={location.name}
        onPress={() => this.selectLocation(location)}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <Text style={badgeCount ? styles.locMarker : { ...styles.locMarker, ...styles.emptyMarker }}>
          {badgeCount || '⊘'}
        </Text>
        <Callout>
          {this.locationCallout(location)}
        </Callout>
      </Marker>
    })
  }

  locationCallout (location: Location) {
    return <View style={styles.callout}>
      <Header
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={styles.calloutTitle}
      >
        {location.name}
      </Header>
      <Text>Rides in area:</Text>
      <View style={styles.calloutDetailContainer}>
        {Object.keys(DifficultyIcon.icons).map(Number).map((difficultyLevel) => {
          let ridesByLevel = this.props.EventStore.futureEvents.filter(
            (event) =>
              event.location === location.id &&
              event.difficulty === difficultyLevel
          ).length
          if (ridesByLevel > 0) {
            return <View style={styles.calloutDiffIcon} key={location.id + '_' + difficultyLevel}>
              <DifficultyIcon d={difficultyLevel} size={Layout.window.hp(3)} />
              <CountBadge count={ridesByLevel} style={styles.calloutDiffIconBadge} />
            </View>
          }
        })}
      </View>
    </View>
  }

  getFriendsEvents = () => {
    let ids = this.props.UserStore.currentUser.friends
      .map((id) => this.props.UserStore.getSync(id).events)
      .flat()

    return this.props.EventStore.list(ids)
  }

  getMyEvents = () => this.props.EventStore.list(this.props.UserStore.currentUser.events)

  getMapEvents = () => this.state.visibleLocations.map((location: Location) => location.events).flat()

  futureEventFilter = (event: Event) => event.datetime > (Math.floor(Date.now() / 1000) - 3600)

  render () {
    let events = this.state.selectedLocation !== null
      ? this.state.selectedLocation.events
      : this.state.tab === 'map'
        ? this.getMapEvents()
        : this.state.tab === 'my'
          ? this.getMyEvents()
          : this.getFriendsEvents()

    let filteredEvents = events.filter(this.futureEventFilter)

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 35 }}>
          {this.state.loading && <ActivityIndicator style={styles.mapLoading} />}
          <AreaMap
            markers={this.mapMarkers(filteredEvents)}
            onRegionChangeComplete={this.onRegionChange}
            onPress={this.clearLocation}
            showsUserLocation
            loadingEnabled
          />
        </View>

        <View style={{ flex: 65 }}>
          {filteredEvents.length > 0
            ? <RidesList
              navigation={this.props.navigation}
              onRefresh={() => this.refresh(this.state.bbox)}
              rides={filteredEvents}
            />
            : !this.state.loading && <Text style={styles.noRidesText}>
              No rides nearby, start one or move the map to see rides in the visible area!
            </Text>}
          {this.state.loading && <View style={styles.listLoading}>
            <ActivityIndicator />
            <Text>Loading rides in visible area...</Text>
          </View>}
          <CreateRideButton navigation={this.props.navigation} />
        </View>
        <TabBar
          options={[
            {
              title: 'Map',
              onPress: () => this.setState({ tab: 'map' })
            },
            {
              title: `My rides (${this.getMyEvents().filter(this.futureEventFilter).length})`,
              onPress: () => this.setState({ tab: 'my' })
            },
            {
              title: 'Friends\' rides',
              onPress: () => this.setState({ tab: 'friends' })
            }
          ]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  locMarker: {
    backgroundColor: Colors.tintColor,
    borderRadius: Layout.window.hp(1),
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: Layout.window.hp(1),
    paddingVertical: Layout.window.hp(0.5),
    textAlign: 'center',
    fontWeight: 'bold'
  },
  emptyMarker: {
    opacity: 0.25,
    backgroundColor: Colors.darkBackground
  },
  callout: {
    width: Layout.window.wp(40),
    alignContent: 'center',
    padding: Layout.window.hp(1)
  },
  calloutTitle: {
    color: Colors.tintColor
  },
  calloutDetailContainer: {
    flexDirection: 'row'
  },
  calloutDiffIcon: {
    alignItems: 'center',
    borderColor: '#DFDFDF',
    borderRadius: Layout.window.hp(1),
    borderWidth: 1,
    padding: Layout.window.hp(0.75),
    margin: 1
  },
  calloutDiffIconBadge: {
    position: 'absolute',
    right: 0,
    fontSize: Layout.window.hp(1.5)
  },
  mapLoading: {
    position: 'absolute',
    zIndex: 10
  },
  listLoading: {
    alignItems: 'center'
  },
  noRidesText: {
    textAlign: 'center',
    paddingHorizontal: Layout.window.wp(4),
    flex: 1,
    justifyContent: 'center'
  }
})
