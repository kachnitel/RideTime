import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import { Location } from '../stores/LocationStore.mobx'
import { Route } from '../stores/RouteStore.mobx'
import SelectTrails from '../components/ride/new_ride/SelectTrails'
import SelectRoute from '../components/ride/new_ride/SelectRoute'
import TabBar from '../components/TabBar'
import TabButton from '../components/TabButton'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import TrailFilter from '../components/ride/new_ride/TrailFilter'
import { Header } from 'react-navigation'

export default
@observer
class SelectRouteTrailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let location = navigation.getParam('location')
    return {
      title: location.name
    }
  }

  state = {
    trailsTab: true,
    loadingTrails: true,
    loadingRoutes: true,
    filter: {
      difficulty: [],
      search: ''
    },
    showFilter: false
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
  >
    <TabButton
      style={styles.tabBarButton}
      icon={this.state.showFilter ? 'close' : 'filter-list'}
      title='Filter'
      onPress={() => this.setState((prevState) => ({ showFilter: !prevState.showFilter }))}
      active={this.state.filter.difficulty.length > 0 || !!this.state.filter.search}
    />
    <TabButton
      style={styles.tabBarButton}
      icon='skip-next'
      title='Skip'
      onPress={() => {
        let route = new Route()
        route.updateTitle(this.location.name)
        return this.submit(route)
      }}
    />
  </TabBar>

  handleTabToggle = () => this.setState((prevState) => ({ trailsTab: !prevState.trailsTab }))

  filter = () => <TrailFilter
    onFilterUpdate={this.handleFilterUpdate}
    style={styles.filterContainer}
    filter={this.state.filter}
  />

  handleFilterUpdate = (filter) => {
    this.setState({
      filter: filter
    })
  }

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
      filter={this.state.filter}
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
      filter={this.state.filter}
    />)

  createRouteFromTrails = (trails: Array) => {
    let trailIds = trails.map((trail) => trail.id)
    let route = new Route()
    route.updateTrails(trailIds)
    route.updateTitle(trails.length === 1 ? trails[0].title : this.location.name)
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
    return <KeyboardAvoidingView
      keyboardVerticalOffset={Header.HEIGHT + 24}
      behavior='padding'
      style={styles.container}
    >
      {
        this.state.trailsTab
          ? this.selectTrails()
          : this.selectRoute()
      }
      {this.state.showFilter && this.filter()}
      {this.tabToggle()}
    </KeyboardAvoidingView>
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
  },
  tabBarButton: {
    width: Layout.window.wp(15),
    color: Colors.tintColor
  },
  filterContainer: {
    backgroundColor: Colors.appBackground,
    padding: Layout.window.wp(4),
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth
    }
  }
})
