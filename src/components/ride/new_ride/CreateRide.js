import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import Moment from 'moment'
import Layout from '../../../../constants/Layout'
import Colors from '../../../../constants/Colors'
import TextInputWithTitle from '../../form/TextInputWithTitle'
import EditDateTime from './EditDateTime'
import SelectDifficulty from '../../form/SelectDifficulty'
import SelectBike from '../../form/SelectBike'
import SetPrivacy from './SetPrivacy'

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
    onValueChange={(d) => this.props.Event.updateDifficulty(d)}
    style={styles.selectDifficulty}
    value={this.props.Event.difficulty}
    title='Select difficulty'
    placeholder='Overall ride difficulty'
    footerText='Select level to indicate to others how difficult trails you plan on riding.'
    required
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
    onValueChange={(t) => this.props.Event.updateTerrain(t)}
    style={styles.itemContainer}
    value={this.props.Event.terrain || undefined}
    title='Bike type'
    placeholder='Select most appropriate bike for the ride'
    required
  />

  description = () => <TextInputWithTitle
    title='Description'
    placeholder='Ride description'
    value={this.props.Event.description}
    containerStyle={styles.itemContainer}
    onChangeText={(desc) => this.props.Event.updateDescription(desc)}
  />

  /**
   * on edit go to select trails/route screen, add strava route option?
   */
  route = () => <TextInputWithTitle
    title='Planned route'
    placeholder='Mashiter, 50 more shades, Rupert'
    value={this.props.Event.route}
    containerStyle={styles.itemContainer}
    onChangeText={(route) => this.props.Event.updateRoute(route)}
  />

  privacy = () => <SetPrivacy
    onPrivacyUpdate={(val) => this.props.Event.updatePrivate(val)}
    onVisibilityUpdate={(val) => this.props.Event.updateVisibility(val)}
    visibility={this.props.Event.visibility}
    private={this.props.Event.private}
  />

  render () {
    return (
      <View {...this.props}>
        {this.title()}
        {this.route()}
        {this.difficulty()}
        {this.datetime()}
        {this.terrain()}
        {this.description()}
        {this.privacy()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.darkBackground,
    paddingVertical: Layout.window.hp(1),
    paddingHorizontal: Layout.window.wp(3)
  }
})
