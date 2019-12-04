import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import AreaMap from '../components/AreaMap'
import { CreateRideButton } from '../components/CreateRideButton'
import RidesList from '../components/lists/RidesList'
import DrawerButton from '../components/DrawerButton'
import { observer, inject } from 'mobx-react/native'
import TouchableWithModal from '../components/TouchableWithModal'
import InvitesList from '../components/lists/InvitesList'
import InvitesIconBadged from '../components/InvitesIconBadged'
import { Marker, Callout } from 'react-native-maps'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import Header from '../components/Header'
import DifficultyIcon from '../components/icons/DifficultyIcon'
import CountBadge from '../components/CountBadge'

/**
 * TODO:
 * - get rides for user - public(*) + friends/groups allowed (* - once privacy is implemented)
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
      loading: true,
      bbox: null,
      visibleLocations: [],
      selectedLocation: null,
      visibleEvents: []
    }
  }

  /**
   * @memberof RidesScreen
   */
  onRidesRefresh = () => {
    this.loadRides()
  }

  /**
   * REVIEW: Duplicated from LocationsPicker - use AreaMap?
   *
   * @param {*} region
   * @memberof RidesScreen
   */
  onRegionChange = async (region) => {
    let bbox = [
      region.latitude - region.latitudeDelta / 2, // southLat - min lat
      region.longitude - region.longitudeDelta / 2, // westLng - min lng
      region.latitude + region.latitudeDelta / 2, // northLat - max lat
      region.longitude + region.longitudeDelta / 2 // eastLng - max lng
    ]
    if (JSON.stringify(bbox) === JSON.stringify(this.state.bbox)) {
      return
    }
    let locations = await this.props.LocationStore.bbox(bbox)
    this.setState({
      visibleLocations: locations,
      bbox: bbox
    })

    this.loadRides()
  }

  loadRides () {
    this.setState({ loading: true })
    if (!this.state.bbox) {
      console.warn('Attempting to load rides without bbox set!')
      return
    }
    this.props.EventStore.filter({ // async
      'location': this.state.visibleLocations.map(({ id }) => id),
      'dateStart': (Math.floor(Date.now() / 1000) - 3600)
    })
    this.setState({
      loading: false,
      visibleEvents: this.props.EventStore.futureEvents.filter(({ location: locationId }) => {
        return this.state.visibleLocations.find(({ id }) => id === locationId)
      })
    })
  }

  selectLocation = (locationInfo) => {
    this.setState({ selectedLocation: locationInfo })
  }

  clearLocation = () => {
    this.setState({ selectedLocation: null })
  }

  mapMarkers () {
    return this.state.visibleLocations.map((locationInfo) => {
      let ridesInLocation = this.state.visibleEvents.filter((event) => event.location === locationInfo.id)
      return <Marker
        coordinate={{
          latitude: locationInfo.coords[0],
          longitude: locationInfo.coords[1]
        }}
        key={locationInfo.id}
        title={locationInfo.name}
        onPress={() => this.selectLocation(locationInfo)}
      >
        <Text style={ridesInLocation.length ? styles.locMarker : { ...styles.locMarker, ...styles.emptyMarker }}>
          {ridesInLocation.length || '⊘'}
        </Text>
        <Callout>
          {this.locationCallout(locationInfo)}
        </Callout>
      </Marker>
    })
  }

  locationCallout (locationInfo) {
    return <View style={styles.callout}>
      <Header
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={styles.calloutTitle}
      >
        {locationInfo.name}
      </Header>
      <Text>Rides in area:</Text>
      <View style={styles.calloutDetailContainer}>
        {Object.keys(DifficultyIcon.icons).map(Number).map((difficultyLevel) => {
          let ridesByLevel = this.props.EventStore.futureEvents.filter(
            (event) =>
              event.location === locationInfo.id &&
              event.difficulty === difficultyLevel
          ).length
          if (ridesByLevel > 0) {
            return <View style={styles.calloutDiffIcon} key={locationInfo.id + '_' + difficultyLevel}>
              <DifficultyIcon d={difficultyLevel} size={Layout.window.hp(3)} />
              <CountBadge count={ridesByLevel} style={styles.calloutDiffIconBadge} />
            </View>
          }
        })}
      </View>
    </View>
  }

  render () {
    let filteredEventList = this.state.selectedLocation === null
      ? this.state.visibleEvents
      : this.state.visibleEvents.filter((event) => event.location === this.state.selectedLocation.id)

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 35 }}>
          {this.state.loading && <ActivityIndicator style={styles.mapLoading} />}
          <AreaMap
            markers={this.mapMarkers()}
            onRegionChangeComplete={this.onRegionChange}
            onPress={this.clearLocation}
            showsUserLocation
            loadingEnabled
          />
        </View>

        <View style={{ flex: 65 }}>
          {filteredEventList.length > 0
            ? <RidesList
              navigation={this.props.navigation}
              onRefresh={this.onRidesRefresh}
              rides={filteredEventList}
            />
            : !this.state.loading && <Text style={styles.noRidesText}>
              No rides nearby, start one or move the map to see rides in the visible area!
            </Text>}
          {this.state.loading && <View style={styles.listLoading}>
            <ActivityIndicator color={'#fff'} />
            <Text>Loading rides in visible area...</Text>
          </View>}
        </View>
        <CreateRideButton navigation={this.props.navigation} />
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
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25);'
  },
  noRidesText: {
    textAlign: 'center',
    paddingHorizontal: Layout.window.wp(4),
    flex: 1,
    justifyContent: 'center'
  }
})
