import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { Marker, Callout } from 'react-native-maps'
import { MaterialIcons } from '@expo/vector-icons'
import AreaMap from '../components/location/AreaMap'
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
import InviteChoices from '../components/ride/InviteChoices'
import TabButton from '../components/TabButton'

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
          modalStyle={styles.invitesModal}
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
      tab: 'map',
      myEvents: []
    }

    props.EventStore.loadSentRequests()
  }

  componentDidMount = () => {
    this.setState({ myEvents: this.getMyEvents() })
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

    this.props.EventStore.filter({
      location: this.props.UserStore.currentUser.locations,
      dateStart: (Math.floor(Date.now() / 1000) - 3600)
    })
    let locations = await this.props.LocationStore.filter(
      { bbox: bbox.map((coord: Number) => coord.toFixed(4)) }, // REVIEW:
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
      .map((id) => this.props.UserStore.get(id).events)
      .flat()

    return ([{
      title: 'My friends\' events',
      data: ids.length > 0
        ? this.props.EventStore.list(ids).filter(this.futureEventFilter)
        : []
    }])
  }

  getMyEvents = () => ([
    {
      title: 'Invites',
      countHighlight: true,
      data: this.props.EventStore.invites
        .filter(this.futureEventFilter)
        .sort((a: Event, b: Event) => a.datetime - b.datetime),
      footer: (event: Event) => <InviteChoices
        options={[
          {
            icon: 'event-available',
            label: 'Join',
            action: () => event.acceptInvite()
          },
          {
            icon: 'clear',
            label: 'Dismiss',
            fade: true,
            action: () => event.declineInvite()
          }
        ]}
      />
    },
    {
      title: 'My rides',
      data: this.props.UserStore.currentUser.events.length > 0
        ? this.props.EventStore
          .list(this.props.UserStore.currentUser.events)
          .filter(this.futureEventFilter)
          .sort((a: Event, b: Event) => a.datetime - b.datetime)
        : []
    },
    {
      title: 'Rides at my locations',
      data: this.props.UserStore.currentUser.locations
        .map((id) => this.props.LocationStore.get(id).events)
        .flat()
        .filter((event) => !this.props.UserStore.currentUser.events.includes(event.id))
        .filter(this.futureEventFilter)
        .sort((a: Event, b: Event) => a.datetime - b.datetime)
    }
  ])

  getMapEvents = () => ([{
    title: 'Nearby events',
    data: this.state.visibleLocations
      .map((location: Location) => location.events).flat()
      .filter(this.futureEventFilter)
      .sort((a: Event, b: Event) => a.datetime - b.datetime)
  }])

  getLocationEvents = () => ([{
    title: 'Events at ' + this.state.selectedLocation.name,
    data: this.state.selectedLocation.events
      .filter(this.futureEventFilter)
      .sort((a: Event, b: Event) => a.datetime - b.datetime)
  }])

  futureEventFilter = (event: Event) => event.datetime > (Math.floor(Date.now() / 1000) - 3600)

  renderTabBar = () => <View style={styles.tabBarContainer}>
    <TabBar
      options={[
        {
          title: 'Map',
          onPress: () => this.setState({ tab: 'map' }),
          icon: 'map'
        },
        {
          title: `My rides (${this.state.myEvents[1]?.data.length})`, // confirmed
          onPress: () => this.setState({ tab: 'my' }),
          icon: 'person-outline',
          badge: this.state.myEvents[0]?.data.length // invites
        },
        {
          title: 'Friends\' rides',
          icon: 'people-outline',
          onPress: () => this.setState({ tab: 'friends' })
        }
      ]}
      style={styles.tabBar}
    >
      <TabButton
        style={styles.tabBarButton}
        icon='add'
        title='Create'
        onPress={() => this.props.navigation.push('NewRide')}
      />
    </TabBar>
  </View>

  render () {
    let sections = this.state.selectedLocation !== null
      ? this.getLocationEvents()
      : this.state.tab === 'map'
        ? this.getMapEvents()
        : this.state.tab === 'my'
          ? this.state.myEvents
          : this.getFriendsEvents()

    let events = sections.map((section) => section.data).flat()

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {this.state.loading && <ActivityIndicator style={styles.mapLoading} />}
          <AreaMap
            markers={this.mapMarkers(events)}
            onRegionChangeComplete={this.onRegionChange}
            onPress={this.clearLocation}
            showsUserLocation
            loadingEnabled
          />
        </View>

        <View style={styles.listContainer}>
          <RidesList
            navigation={this.props.navigation}
            onRefresh={() => this.refresh(this.state.bbox)}
            sections={sections}
          />
          {!this.state.loading && events.length === 0 && <>
            {/* TODO: create <EmptyComponent icon='name' text='' /> */}
            <MaterialIcons
              name={'event-busy'}
              size={Layout.window.wp(50)}
              color={Colors.tintColor}
              style={{ opacity: 0.1, alignSelf: 'center' }} // TODO:
            />
            <Text style={styles.noRidesText}>
              No rides nearby, start one or move the map to see rides in the visible area!
            </Text>
          </>}
          {this.state.loading && <View style={styles.listLoading}>
            <ActivityIndicator />
            <Text>Loading rides in visible area...</Text>
          </View>}
        </View>
        {this.renderTabBar()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 30
  },
  listContainer: {
    flex: 70
  },
  locMarker: {
    backgroundColor: Colors.tintColor,
    borderRadius: Layout.window.hp(1),
    color: Colors.secondaryText,
    borderColor: Colors.secondaryText,
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
    padding: Layout.window.hp(0.75)
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
  },
  invitesModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: Layout.window.hp(7)
  },
  tabBar: {
    flex: 1
  },
  tabBarButton: {
    width: Layout.window.wp(15)
  }
})
