import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { Location } from '../stores/LocationStore.mobx'
import { SafeAreaView } from 'react-navigation'
import SelectTrails from '../components/new_ride/SelectTrails'
import SelectRoute from '../components/new_ride/SelectRoute'

export default
@observer
class SelectRouteTrailsScreen extends Component {
  state = {
    trailsTab: false
    // route: undefined
  }

  location: Location

  constructor (props) {
    super(props)

    this.location = props.navigation.getParam('location')
    this.location.loadTrails()
    this.location.loadRoutes()
  }

  tabToggle = () => <View style={styles.toggleContainer}>
    <TouchableOpacity onPress={this.handleTabToggle} disabled={!this.state.trailsTab}>
      <Text
        style={!this.state.trailsTab ? styles.tabToggle : { ...styles.tabToggle, ...styles.tabToggleActive }}
      >
        Routes
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={this.handleTabToggle} disabled={this.state.trailsTab}>
      <Text
        style={this.state.trailsTab ? styles.tabToggle : { ...styles.tabToggle, ...styles.tabToggleActive }}
      >
        Trails
      </Text>
    </TouchableOpacity>
  </View>

  handleTabToggle = () => this.setState((prevState) => ({ trailsTab: !prevState.trailsTab }))

  /**
   * REVIEW: Create Event entity here, set location and create Route entity as its property
   * (move from CreateRideScreen constructor)
   * Update Route using TrailsPicker/RoutePicker (or skip) and navigate to CreateRideScreen
   *   - which will display this route detail, tapping (edit icon?) goes back to this screen
   *
   * @returns
   * @memberof SelectRouteTrailsScreen
   */
  render () {
    return <SafeAreaView style={styles.container}>
      {this.tabToggle()}
      {
        this.state.trailsTab
          ? <SelectTrails location={this.location} /> // Allow selecting multiple trails in area and create Route
          : <SelectRoute location={this.location} /> // Select route from Trailforks
      }
    </SafeAreaView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    display: 'flex'
  },
  tabToggle: {
    backgroundColor: Colors.tintColor,
    color: '#fff',
    padding: Layout.window.hp(2),
    fontWeight: 'bold',
    textAlign: 'center',
    width: Layout.window.wp(50) // Flex or what?!
  },
  tabToggleActive: {
    backgroundColor: '#fff',
    color: Colors.tintColor
  }
})
