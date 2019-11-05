import React, { Component } from 'react'
import { observer } from 'mobx-react/native'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import AlternatingStyleList from '../components/lists/AlternatingStyleList'
import { Location } from '../stores/LocationStore.mobx'
import TrailItem from '../components/list_items/TrailItem'
import { SafeAreaView } from 'react-navigation'

export default
@observer
class SelectRouteTrailsScreen extends Component {
  state = {
    trailsTab: false
  }

  location: Location

  componentDidMount = () => {
    this.location = this.props.navigation.getParam('location')
    this.location.loadTrails()
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

  // TODO: Component
  trailsComponent = () => <View>
    <Text>TODO: Filter</Text>
    <ScrollView>
      <AlternatingStyleList
        items={this.location.trails}
        onItemPress={(item) => console.log(item.title)}
        itemComponent={(item, style) => <TrailItem trail={item} style={style} />}
      />
    </ScrollView>
  </View>

  routesComponent = () => <View>
    <Text>Other fancy list here, propagates a created `route` (actual Route object)</Text>
  </View>

  /**
   * REVIEW: Create Event entity here, set location and create Route entity as its property
   * (move from CreateRideScreen constructor)
   * Route contains ID (trailforks, url?), trails[], description, title
   * Update Route using TrailsPicker/RoutePicker (or skip) and navigate to CreateRideScreen
   *   - which will display this route detail, tapping (edit icon?) goes back to this screen
   *
   * @returns
   * @memberof SelectRouteTrailsScreen
   */
  render () {
    return <SafeAreaView>
      {this.tabToggle()}
      {
        this.state.trailsTab
          ? this.trailsComponent()
          : this.routesComponent()
          // ? <TrailsPicker location={location} /> // Allow selecting multiple trails in area
          // : <RoutePicker location={location} /> // Select route, add trails to list (which shall be a part of route object in event)
      }
    </SafeAreaView>
  }
}

const styles = StyleSheet.create({
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
