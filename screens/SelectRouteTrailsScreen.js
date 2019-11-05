import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import AlternatingStyleList from '../components/lists/AlternatingStyleList'

export default class SelectRouteTrailsScreen extends Component {
  state = {
    trailsTab: false
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
    <Text>Some fancy list here, propagates a created `trails list` (array of Trail objects)</Text>
    <ScrollView style={{ backgroundColor: 'red' }}>
      <AlternatingStyleList
        items={this.props.navigation.getParam('trails')}
        onItemPress={(item) => console.log(item.toJs())}
        itemComponent={(item, style) => <View>
          <Text>{item.title}</Text>
        </View>}
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
    // let location = this.props.navigation.getParam('location')
    console.log(this.props.navigation.getParam('trails').map((item) => { return { title: item.title, profile: item.profile } }))

    return <View>
      {this.tabToggle()}
      {
        this.state.trailsTab
          ? this.trailsComponent()
          : this.routesComponent()
          // ? <TrailsPicker location={location} /> // Allow selecting multiple trails in area
          // : <RoutePicker location={location} /> // Select route, add trails to list (which shall be a part of route object in event)
      }
    </View>
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
