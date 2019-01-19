import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AreaMap } from '../components/AreaMap'
import { CreateRideButton } from '../components/CreateRideButton'
import RidesList from '../components/lists/RidesList'
import LocationsProvider from '../providers/LocationsProvider'
import RidesProvider from '../providers/RidesProvider'

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
      locations: LocationsProvider.getLocations(),
      rides: RidesProvider.getRides()
    }
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
