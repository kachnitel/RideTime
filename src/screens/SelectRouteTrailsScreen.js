import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Location } from '../stores/LocationStore.mobx'
import { Route } from '../stores/RouteStore.mobx'
import SelectTrails from '../components/ride/new_ride/SelectTrails'
import SelectRoute from '../components/ride/new_ride/SelectRoute'
import Button from '../components/form/Button'
import HeaderRightView from '../components/navigation_header/HeaderRightView'
import TabBar from '../components/TabBar'

export default
@observer
class SelectRouteTrailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let location = navigation.getParam('location')
    let route = new Route()
    route.updateTitle(location.name)
    return {
      title: location.name,
      headerRight: <HeaderRightView>
        <Button
          title='Skip'
          onPress={() => navigation.push(
            'CreateRide',
            {
              location: location,
              route: route
            }
          )}
        />
      </HeaderRightView>
    }
  }

  state = {
    trailsTab: true,
    loadingTrails: true,
    loadingRoutes: true
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
    await this.location.loadTrails()
    this.setState({ loadingTrails: false, loadingRoutes: true })
    await this.location.loadRoutes()
    this.setState({ loadingRoutes: false })
  }

  tabToggle = () => <TabBar
    options={[
      {
        title: 'Trails',
        onPress: this.handleTabToggle,
        icon: 'playlist-add'
      },
      {
        title: 'Routes',
        onPress: this.handleTabToggle,
        icon: 'timeline'
      }
    ]}
  />

  handleTabToggle = () => this.setState((prevState) => ({ trailsTab: !prevState.trailsTab }))

  /**
   * Allow selecting multiple trails in area and create Route
   */
  selectTrails = () => (this.state.loadingTrails
    ? <View style={styles.loadingContainer}>
      <ActivityIndicator />
      <Text>Loading trails...</Text>
    </View>
    : <SelectTrails
      location={this.location}
      onSubmit={(trails) => this.createRouteFromTrails(trails)}
    />)

  /**
   * Select route from Trailforks
   */
  selectRoute = () => (this.state.loadingRoutes
    ? <View style={styles.loadingContainer}>
      <ActivityIndicator />
      <Text>Loading routes...</Text>
    </View>
    : <SelectRoute
      location={this.location}
      onSubmit={(route) => this.submit(route)}
    />)

  createRouteFromTrails = (trails: Array) => {
    let trailIds = trails.map((trail) => trail.id)
    let route = new Route()
    route.updateTrails(trailIds)
    route.updateTitle(this.location.name)
    route.updateDifficulty(Math.max(...trails.map((trail) => trail.difficulty)))

    this.submit(route)
  }

  /**
   * TODO: create an object to store in event? Or pass in Route(+location) to the next screen?
   *
   * @memberof SelectRouteTrailsScreen
   */
  submit = (route: Route) => {
    this.props.navigation.push(
      'CreateRide',
      {
        location: this.location,
        route: route
      }
    )
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
      {
        this.state.trailsTab
          ? this.selectTrails()
          : this.selectRoute()
      }
      {this.tabToggle()}
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
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
