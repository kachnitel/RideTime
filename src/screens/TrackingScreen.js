import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { Polyline } from 'react-native-maps'
import DrawerButton from '../components/navigation_header/DrawerButton'
import AreaMap from '../components/location/AreaMap'
import UserMarker from '../components/tracking/UserMarker'
import Button from '../components/form/Button'
import { UserLocation } from '../stores/TrackingStore.mobx'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default
@inject('UserStore', 'TrackingStore')
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

  state = {
    users: {}
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

  render () {
    let active = !!this.props.TrackingStore.status
    return (
      <View style={styles.container}>
        <AreaMap
          showsUserLocation
          markers={this.getMarkers()}
          polylines={this.getLines()}
        />
        <View style={styles.startButton}>
          <Button
            title={active ? 'stop' : 'start'}
            onPress={() => active ? this.props.TrackingStore.stop() : this.props.TrackingStore.enable('friends')}
            color={active ? Colors.confirmationHighlight : undefined}
          />
        </View>
        <Button title='clear data' onPress={() => this.props.TrackingStore._collection.clear()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  startButton: {
    position: 'absolute',
    bottom: Layout.window.wp(10),
    right: Layout.window.wp(10),
    aspectRatio: 1,
    borderRadius: Layout.window.hp(5)
  }
})
