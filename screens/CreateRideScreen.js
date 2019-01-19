import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import SelectDifficulty from '../components/new_ride/SelectDifficulty'
import Layout from '../constants/Layout'

/**
 * Setup ride here - difficulty, trails, friends, ...
 *
 * TODO: Done button
 * TODO: Add a little "edit" icon at TextInput end
 *
 * @export
 * @class CreateRideScreen
 * @extends {React.Component}
 */
export default class CreateRideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.rideNameInput}
          placeholder='Ride name'
          value={this.props.navigation.getParam('name') + ' ride'}
        />
        <SelectDifficulty onSelect={this.setDifficulty} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Constants.statusBarHeight // TODO enable once header is disabled
  },
  rideNameInput: {
    alignSelf: 'stretch',
    fontWeight: 'bold',
    fontSize: Layout.window.hp(3.5),
    padding: Layout.window.hp(1.5),
    width: 'auto'
  }
})
