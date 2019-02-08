import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import SelectDifficulty from './SelectDifficulty'
import EditDescription from './EditDescription'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import EditDateTime from './EditDateTime'
import Moment from 'moment'
import SelectTerrain from './SelectTerrain'

export default class CreateRide extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ride: this.props.ride
    }
  }

  handleUpdateName = (rideTitle) => {
    this.handleUpdate(rideTitle, 'title')
  }

  handleUpdateDescription = (rideDescription) => {
    this.handleUpdate(rideDescription, 'description')
  }

  handleUpdateRoute = (rideRoute) => {
    this.handleUpdate(rideRoute, 'route')
  }

  handleUpdateDateTime = (datetime) => {
    this.handleUpdate((new Moment(datetime)), 'datetime')
  }

  handleUpdateDifficulty = (d) => {
    this.handleUpdate(d, 'difficulty')
  }

  handleUpdateTerrain = (t) => {
    this.handleUpdate(t, 'terrain')
  }

  handleUpdate = async (val, key) => {
    await this.setState(
      (prevState) => ({ ride: { ...prevState.ride, [key]: val } })
    )
    this.props.updateCallback(this.state.ride)
  }

  render () {
    return (
      <View {...this.props}>
        <TextInput
          style={styles.rideTitleInput}
          placeholder='Ride name'
          value={this.state.ride.title}
          onChangeText={this.handleUpdateName}
        />
        <SelectDifficulty
          onSelect={this.handleUpdateDifficulty}
          style={{ ...styles.itemContainer, ...styles.selectDifficulty }}
          selected={this.state.ride.difficulty}
          title='Tap to select difficulty'
        />
        <EditDateTime
          value={this.state.ride.datetime && this.state.ride.datetime.format('llll')}
          onSelect={this.handleUpdateDateTime}
          title='Select date and time'
          containerStyle={styles.itemContainer}
          placeholder='Tap to select'
        />
        <SelectTerrain
          onSelect={this.handleUpdateTerrain}
          style={{ ...styles.itemContainer, ...styles.selectTerrain }}
          selected={this.state.ride.terrain}
          title='What kind of a ride?'
        />
        <EditDescription
          title='Description'
          placeholder='Ride description'
          value={this.state.ride.description}
          containerStyle={styles.itemContainer}
          onChangeText={this.handleUpdateDescription}
        />
        <EditDescription
          title='Planned route'
          placeholder='Mashiter, 50 more shades, Rupert'
          value={this.state.ride.route}
          containerStyle={styles.itemContainer}
          onChangeText={this.handleUpdateRoute}
        />
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
