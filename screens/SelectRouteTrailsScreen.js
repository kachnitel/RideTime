import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { Location } from '../stores/LocationStore.mobx'
import { SafeAreaView } from 'react-navigation'
import SelectTrails from '../components/new_ride/SelectTrails'
import SelectRoute from '../components/new_ride/SelectRoute'
import { Route } from '../stores/RouteStore.mobx'

export default
@observer
class SelectRouteTrailsScreen extends Component {
  state = {
    trailsTab: true,
    loadingTrails: true,
    loadingRoutes: true
    // route: undefined
  }

  location: Location

  constructor (props) {
    super(props)

    this.location = props.navigation.getParam('location')
  }

  componentDidMount = () => {
    this.loadData()
  }

  loadData = async () => {
    this.setState({ loadingTrails: true })
    this.location.loadTrails()
    this.setState({ loadingTrails: false, loadingRoutes: true })
    this.location.loadRoutes()
    this.setState({ loadingRoutes: false })
  }

  tabToggle = () => <View style={styles.toggleContainer}>
    <TouchableOpacity onPress={this.handleTabToggle} disabled={this.state.trailsTab}>
      <Text
        style={this.state.trailsTab ? styles.tabToggle : { ...styles.tabToggle, ...styles.tabToggleActive }}
      >
        Trails
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={this.handleTabToggle} disabled={!this.state.trailsTab}>
      <Text
        style={!this.state.trailsTab ? styles.tabToggle : { ...styles.tabToggle, ...styles.tabToggleActive }}
      >
        Routes
      </Text>
    </TouchableOpacity>
  </View>

  handleTabToggle = () => this.setState((prevState) => ({ trailsTab: !prevState.trailsTab }))

  /**
   * Allow selecting multiple trails in area and create Route
   */
  selectTrails = () => (this.state.loadingTrails
    ? <ActivityIndicator />
    : <SelectTrails
      location={this.location}
      onSubmit={(trails) => this.createRouteFromTrails(trails)}
    />)

  /**
   * Select route from Trailforks
   */
  selectRoute = () => (this.state.loadingRoutes
    ? <ActivityIndicator />
    : <SelectRoute
      location={this.location}
      onSubmit={(route) => this.submit(route)}
    />)

  createRouteFromTrails = (trails: Array) => {
    let trailIds = trails.map((trail) => trail.id)
    let route = new Route()
    route.updateTrails(trailIds)
    route.updateTitle(this.location.name + ' ride')
    route.updateDifficulty(Math.max(...trails.map((trail) => trail.difficulty)))

    this.submit(route)
  }

  /**
   * TODO: create an object to store in event? Or pass in Route(+location) to the next screen?
   *
   * @memberof SelectRouteTrailsScreen
   */
  submit = (route: Route) => {
    console.log(route.trails, route.title)
  }

  /**
   * TODO: Create Event entity here, set location and create Route entity as its property
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
          ? this.selectTrails()
          : this.selectRoute()
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
