import React from 'react'
import { View, StyleSheet, FlatList, Text, TouchableHighlight } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { Polyline } from 'react-native-maps'
import DrawerButton from '../components/navigation_header/DrawerButton'
import AreaMap from '../components/location/AreaMap'
import UserMarker from '../components/tracking/UserMarker'
import { UserLocation } from '../stores/TrackingStore.mobx'
import { User } from '../stores/UserStore.mobx'
import { Event } from '../stores/EventStore.mobx'
import Layout from '../../constants/Layout'
import TabBar from '../components/TabBar'
import TabButton from '../components/TabButton'
import ModalView from '../components/modal/ModalView'
import UsersList from '../components/user/UsersList'
import Header from '../components/Header'
import Colors from '../../constants/Colors'
import MenuModalOption from '../components/modal/MenuModalOption'
import RideItem from '../components/ride/RideItem'
import moment from 'moment'

export default
@inject('UserStore', 'TrackingStore', 'EventStore')
@observer
class TrackingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Live tracking',
      headerLeft: <DrawerButton navigation={navigation} />
    }
  }

  _refreshInterval = null
  MAX_COLORS = 15
  map = null

  state = {
    usersModalVisible: false,
    typeModalVisible: false,
    eventModalVisible: false,
    users: {}
  }

  showUsersModal = () => {
    this.setState({
      usersModalVisible: true
    })
  }

  hideUsersModal = () => {
    this.setState({
      usersModalVisible: false
    })
  }

  showTypeModal = () => {
    this.setState({
      typeModalVisible: true
    })
  }

  hideTypeModal = () => {
    this.setState({
      typeModalVisible: false
    })
  }

  showEventModal = () => {
    this.setState({
      eventModalVisible: true
    })
  }

  hideEventModal = () => {
    this.setState({
      eventModalVisible: false
    })
  }

  componentDidMount = () => {
    this.props.TrackingStore.list()
    // Sync frequently when app is in foreground
    this._refreshInterval = setInterval(() => {
      this.props.TrackingStore.list()
      this.props.TrackingStore.push()
    }, 5000)
  }

  componentWillUnmount = () => {
    clearInterval(this._refreshInterval)
  }

  getMarkers = () => this.props.TrackingStore.current.slice().map((userLocation: UserLocation) => <UserMarker
    coords={userLocation.coords}
    color={this.getUser(userLocation.user).color}
    user={this.getUser(userLocation.user).user}
    onCalloutPress={(user) => this.props.navigation.push('PublicProfile', user)}
    key={'curr_loc_' + userLocation.user}
  />)

  getLines = () => this.props.TrackingStore.tracks.slice().map((track: Array) => <Polyline
    coordinates={track.map((userLocation: UserLocation) => ({
      latitude: userLocation.coords[0],
      longitude: userLocation.coords[1]
    }))}
    strokeColor={this.getUser(track[0].user).color}
    strokeWidth={Layout.window.wp(1)}
    key={'track_loc_' + track[0].user}
  />)

  getUser = (id: Number) => {
    if (!this.state.users[id]) {
      this.state.users[id] = {
        user: this.props.UserStore.get(id),
        color: this.rainbow(this.MAX_COLORS, Math.floor(Math.random() * this.MAX_COLORS))
      }
    }

    return this.state.users[id]
  }

  /**
   * @see https://stackoverflow.com/a/7419630/2623736
   */
  rainbow = (numOfSteps, step) => {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b
    var h = step / numOfSteps
    var i = ~~(h * 6)
    var f = h * 6 - i
    var q = 1 - f
    switch (i % 6) {
      case 0: r = 1; g = f; b = 0; break
      case 1: r = q; g = 1; b = 0; break
      case 2: r = 0; g = 1; b = f; break
      case 3: r = 0; g = q; b = 1; break
      case 4: r = f; g = 0; b = 1; break
      case 5: r = 1; g = 0; b = q; break
    }
    var c = '#' + ('00' + (~~(r * 255)).toString(16))
      .slice(-2) + ('00' + (~~(g * 255)).toString(16))
      .slice(-2) + ('00' + (~~(b * 255)).toString(16))
      .slice(-2)
    return (c)
  }

  renderTabBar = (active: Boolean) => <View style={styles.tabBarContainer}>
    <TabBar>
      <TabButton
        style={styles.tabBarButton}
        icon='list'
        onPress={this.state.usersModalVisible ? this.hideUsersModal : this.showUsersModal}
        title='Show users'
        active={this.state.usersModalVisible}
        badge={this.props.TrackingStore.trackedUsers.length}
      />
      <TabButton
        active={active}
        style={styles.tabBarButton}
        icon={active ? 'my-location' : 'location-searching'}
        onPress={() => active ? this.props.TrackingStore.stop() : this.showTypeModal()}
        title={active ? 'Stop tracking' : 'Start tracking'}
      />
    </TabBar>
  </View>

  renderUsersModal = () => <ModalView
    isVisible={this.state.usersModalVisible}
    onBackButtonPress={this.hideUsersModal}
    onBackdropPress={this.hideUsersModal}
    style={styles.usersModal}
  >
    <View
      style={styles.usersList}
    >
      <UsersList
      // REVIEW: separate current ride, friends, emergency on top and red badge
        sections={[{
          title: 'Tracked users',
          data: this.props.TrackingStore.trackedUsers.slice()
        }]}
        onItemPress={(user: User) => {
          let userloc: UserLocation = this.props.TrackingStore.current
            .filter((ul: UserLocation) => ul.user === user)[0]
          let coords = {
            latitude: userloc.coords[0],
            longitude: userloc.coords[1]
          }
          this.map.animateCamera({ center: coords }, { duration: 500 })
        }}
      />
    </View>
  </ModalView>

  renderTypeModal = () => <ModalView
    isVisible={this.state.typeModalVisible}
    onBackButtonPress={this.hideTypeModal}
    onBackdropPress={this.hideTypeModal}
  >
    <Header style={styles.header}>Visibility</Header>
    <MenuModalOption
      style={styles.option}
      onPress={() => {
        this.props.TrackingStore.enable('friends')
        this.hideTypeModal()
      }}
      label='Friends'
      description='All your friends can see your location'
      icon='people-outline'
    />
    <MenuModalOption
      style={styles.option}
      onPress={() => {
        this.hideTypeModal()
        this.showEventModal()
      }}
      label='Event'
      description='Allow people you are riding with to see your location'
      icon='event'
    />
    <MenuModalOption
      style={styles.option}
      onPress={() => {
        this.props.TrackingStore.enable('emergency')
        this.hideTypeModal()
      }}
      label='Emergency'
      description='Anyone nearby can see your location. Use if you need help!'
      icon='healing'
      highlight
    />
  </ModalView>

  renderEventsModal = () => <ModalView
    isVisible={this.state.eventModalVisible}
    onBackButtonPress={this.hideEventModal}
    onBackdropPress={this.hideEventModal}
  >
    <Header style={styles.header}>Events</Header>
    <FlatList
      data={this.props.EventStore
        .list(this.props.UserStore.currentUser.events)
        .filter((event: Event) => event.datetime * 1000 > moment().startOf('day'))}
      renderItem={this.eventComponent}
      ListEmptyComponent={<Text style={styles.listEmptyText}>No current events, why not start one!</Text>}
      keyExtractor={(item: Event) => 'event_' + item.id}
      onRefresh={this.refresh}
      refreshing={false}
      extraData={this.props.EventStore.invites.length}
      style={styles.eventList}
    />
  </ModalView>

  eventComponent = (item) => {
    let event: Event = item.item
    return <TouchableHighlight
      onPress={() => {
        this.props.TrackingStore.enable('event', event)
        this.hideEventModal()
      }}
    >
      <RideItem ride={event} />
    </TouchableHighlight>
  }

  renderEvent = () => this.props.TrackingStore.status === 'event' &&
    <RideItem
      ride={this.props.EventStore.get(this.props.TrackingStore.event)}
      style={styles.currentEvent}
    />

  renderEmergency = () => this.props.TrackingStore.status === 'emergency' &&
    <View style={styles.emergency}>
      <Text>Emergency</Text>
    </View>

  render () {
    let active = !!this.props.TrackingStore.status
    return (
      <View style={styles.container}>
        <AreaMap
          showsUserLocation
          markers={this.getMarkers()}
          polylines={this.getLines()}
          updateRef={(map) => { this.map = map }}
        />
        {this.renderEvent()}
        {this.renderEmergency()}
        {this.renderTabBar(active)}
        {this.renderUsersModal()}
        {this.renderTypeModal()}
        {this.renderEventsModal()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBarButton: {
    width: Layout.window.wp(50)
  },
  usersModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  usersList: {
    width: '100%',
    height: '50%'
  },
  header: {
    paddingVertical: Layout.window.hp(1),
    width: '100%',
    textAlign: 'center',
    backgroundColor: Colors.tintColor,
    color: Colors.secondaryText
  },
  option: {
    height: Layout.window.hp(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabIconDefault
  },
  eventList: {
    width: '90%'
  },
  currentEvent: {
    height: Layout.window.hp(17),
    padding: Layout.window.wp(2)
  },
  emergency: {
    backgroundColor: 'red',
    padding: Layout.window.wp(2),
    alignItems: 'center'

  }
})
