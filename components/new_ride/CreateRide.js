import React from 'react'
import { View, StyleSheet } from 'react-native'
import SelectDifficulty from '../sign_up/SelectDifficulty'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import EditDateTime from './EditDateTime'
import Moment from 'moment'
import { observer, inject } from 'mobx-react/native'
import TextInputWithTitle from '../form/TextInputWithTitle'
import SelectBike from '../sign_up/SelectBike'

export default
@inject('Event')
@observer
class CreateRide extends React.Component {
  title = () => <TextInputWithTitle
    placeholder='Fun ride'
    value={this.props.Event.title}
    onChangeText={(text) => this.props.Event.updateTitle(text)}
    containerStyle={styles.itemContainer}
    title='Ride title'
  />

  difficulty = () => <SelectDifficulty
    onValueChange={(d) => this.props.Event.updateDifficulty(d.value)}
    style={{ ...styles.itemContainer, ...styles.selectDifficulty }}
    selected={this.props.Event.difficulty}
    title='Select difficulty'
    placeholder='Overall ride difficulty'
    footerText='Select level to indicate to others how difficult trails you plan on riding.'
  />

  datetime = () => <EditDateTime
    // FIXME: shouldn't need to recreate new Moment to display
    value={this.props.Event.datetime && new Moment(this.props.Event.datetime).format('llll')}
    onSelect={(dt) => this.props.Event.updateDatetime(new Moment(dt))}
    title='Select date and time'
    containerStyle={styles.itemContainer}
    placeholder='Tap to select'
  />

  terrain = () => <SelectBike
    onValueChange={(t) => this.props.Event.updateTerrain(t.value)}
    style={{ ...styles.itemContainer, ...styles.selectTerrain }}
    selected={this.props.Event.terrain}
    title='What kind of bike?'
    placeholder='Select most appropriate bike for the ride'
  />

  description = () => <TextInputWithTitle
    title='Description'
    placeholder='Ride description'
    value={this.props.Event.description}
    containerStyle={styles.itemContainer}
    onChangeText={(desc) => this.props.Event.updateDescription(desc)}
  />

  /**
   * TODO:
   * Autocomplete from either router and trails
   * - Select either a route, or trails which can be added
   * with autocomplete from the area
   *  |  Autocomplete  |
   *  |----------------|
   *  | popular rides  |
   *  |----------------|
   *  |                |
   *  | popular trails |
   *  |                |
   *  |----------------|
   *
   * @memberof CreateRide
   */
  route = () => <TextInputWithTitle
    title='Planned route'
    placeholder='Mashiter, 50 more shades, Rupert'
    value={this.props.Event.route}
    containerStyle={styles.itemContainer}
    onChangeText={(route) => this.props.Event.updateRoute(route)}
  />

  render () {
    return (
      <View {...this.props}>
        {this.title()}
        {this.route()}
        {/* Private / public */}
        {/* {this.invite()} NEXT PAGE (RideDetail) */}
        {this.difficulty()}
        {this.datetime()}
        {this.terrain()}
        {this.description()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectDifficulty: {
    height: Layout.window.wp(23)
  },
  selectTerrain: {
    height: Layout.window.wp(28)
  },
  rideTitleInput: {
    alignSelf: 'stretch',
    fontWeight: 'bold',
    fontSize: Layout.window.hp(3.5),
    padding: Layout.window.hp(1.5),
    width: 'auto'
  },
  itemContainer: {
    backgroundColor: Colors.darkBackground,
    paddingVertical: Layout.window.hp(1),
    paddingHorizontal: Layout.window.wp(3)
  }
})
