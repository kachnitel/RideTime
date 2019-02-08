import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AreaMap } from '../components/AreaMap'
import { CreateRideButton } from '../components/CreateRideButton'
import RidesList from '../components/lists/RidesList'
import LocationsProvider from '../providers/LocationsProvider'
import RidesProvider from '../providers/RidesProvider'

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
      headerLeft: (
        <TouchableHighlight
          onPress={() => navigation.toggleDrawer()}>
          <View style={styles.headerMenuIconContainer}>
            <Icon style={styles.headerMenuIcon} name='menu' />
          </View>
        </TouchableHighlight>
      )
    }
  };

  constructor (props) {
    super(props)

    this.state = {
      locations: [],
      rides: []
    }
  }

  componentDidMount () {
    // TODO: Is the screen the best place to load data?
    // rides/locations/... should be available to AreaMap as well as RidesList
    let ridesProvider = new RidesProvider()
    ridesProvider.getRides()
      .then((result) => {
        this.setState({ rides: result })
      })

    let locationsProvider = new LocationsProvider()
    locationsProvider.getLocations()
      .then((result) => {
        this.setState({ locations: result })
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
          />
        </View>

        <CreateRideButton navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    headerMenuIconContainer: {
      justifyContent: 'center'
    },
    headerMenuIcon: {
      fontSize: 24,
      paddingLeft: 15,
      color: '#0C5E14'
    }
  }
)
