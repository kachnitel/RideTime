import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import SelectDifficulty from './SelectDifficulty'
import EditDescription from './EditDescription'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

export default class CreateRide extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ride: {
        name: this.props.navigation.getParam('name') + ' ride',
        description: '',
        route: ''
      }
    }
  }

  handleUpdateName = (rideName) => {
    this.handleUpdate(rideName, 'name')
  }

  handleUpdateDescription = (rideDescription) => {
    this.handleUpdate(rideDescription, 'description')
  }

  handleUpdateRoute = (rideRoute) => {
    this.handleUpdate(rideRoute, 'route')
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
          style={styles.rideNameInput}
          placeholder='Ride name'
          value={this.state.ride.name}
          onChangeText={this.handleUpdateName}
        />
        <SelectDifficulty onSelect={this.setDifficulty} style={styles.selectDifficulty} />
        <EditDescription
          title='Description'
          placeholder='Ride description'
          value={this.state.ride.description}
          style={styles.textItemContainer}
          onChangeText={this.handleUpdateDescription}
        />
        <EditDescription
          title='Planned route'
          placeholder='Mashiter, 50 more shades, Rupert'
          value={this.state.ride.route}
          style={styles.textItemContainer}
          onChangeText={this.handleUpdateRoute}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectDifficulty: {
    height: Layout.window.wp(17),
    backgroundColor: Colors.darkBackground
  },
  rideNameInput: {
    alignSelf: 'stretch',
    fontWeight: 'bold',
    fontSize: Layout.window.hp(3.5),
    padding: Layout.window.hp(1.5),
    width: 'auto'
  },
  textItemContainer: {
    backgroundColor: Colors.darkBackground,
    padding: Layout.window.hp(1.5)
  }
})
