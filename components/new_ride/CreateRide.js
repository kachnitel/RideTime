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
      rideName: this.props.navigation.getParam('name') + ' ride',
      rideDescription: '',
      rideRoute: ''
    }
  }

  onChangeName (rideName) {
    this.setState({ rideName })
  }

  onChangeDescription (rideDescription) {
    this.setState({ rideDescription })
  }

  onChangeRoute (rideRoute) {
    this.setState({ rideRoute })
  }

  render () {
    return (
      <View {...this.props}>
        <TextInput
          style={styles.rideNameInput}
          placeholder='Ride name'
          value={this.state.rideName}
          onChangeText={value => this.onChangeName(value)}
        />
        <SelectDifficulty onSelect={this.setDifficulty} style={styles.selectDifficulty} />
        <EditDescription
          title='Description'
          placeholder='Ride description'
          style={styles.textItemContainer}
          onChangeText={value => this.onChangeDescription(value)}
        />
        <EditDescription
          title='Trails planned'
          placeholder='Mashiter, 50 more shades, Rupert'
          style={styles.textItemContainer}
          onChangeText={value => this.onChangeRoute(value)}
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
