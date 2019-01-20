import React from 'react'
import { StyleSheet, View, TextInput, Text, Button } from 'react-native'
import SelectDifficulty from '../components/new_ride/SelectDifficulty'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import EditDescription from '../components/new_ride/EditDescription';

/**
 * Setup ride here - difficulty, trails, friends, ...
 *
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
      <View style={styles.screen}>
        <View style={styles.container}>
          <TextInput
            style={styles.rideNameInput}
            placeholder='Ride name'
            value={this.props.navigation.getParam('name') + ' ride'}
          />
          <SelectDifficulty onSelect={this.setDifficulty} style={styles.selectDifficulty} />
          <EditDescription
            title='Description'
            placeholder='Ride description'
            style={styles.textItemContainer}
          />
          <EditDescription
            title='Trails planned'
            placeholder='Mashiter, 50 more shades, Rupert'
            style={styles.textItemContainer}
          />
        </View>
        <Button
          title='Create ride'
          onPress={() => console.log('save')}
          color={Colors.tintColor} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Constants.statusBarHeight // TODO enable once header is disabled
  },
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
  },
  screen: {
    flex: 1
  }
})
