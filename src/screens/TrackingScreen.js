import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import DrawerButton from '../components/navigation_header/DrawerButton'
import AreaMap from '../components/location/AreaMap'
import UserMarker from '../components/tracking/UserMarker'
import Button from '../components/form/Button'
import { UserLocation } from '../stores/TrackingStore.mobx'

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

  state = {
    markers: []
  }

  _refreshInterval = null

  componentDidMount = () => {
    this._refreshInterval = setInterval
  }

  getMarkers = () => this.state.markers.map((userLocation: UserLocation) => <UserMarker
    location={userLocation.coords}
    user={userLocation.user}
    key={'curr_loc_' + userLocation.user.id}
  />)

  render () {
    return (
      <View style={styles.container}>
        <AreaMap
          showsUserLocation
          markers={this.getMarkers()}
        />
        <Button title='start' onPress={() => this.props.TrackingStore.enable('friends')} />
        <Button title='stop' onPress={() => this.props.TrackingStore.stop()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
