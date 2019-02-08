import React from 'react'
import { StyleSheet, ScrollView, Button, KeyboardAvoidingView } from 'react-native'
import Colors from '../constants/Colors'
import CreateRide from '../components/new_ride/CreateRide'
import { Header } from 'react-navigation'

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

  constructor (props) {
    super(props)

    this.state = {
      ride: {
        name: this.props.navigation.getParam('name') + ' ride',
        description: '',
        route: '',
        locationId: this.props.navigation.getParam('id'),
        difficulty: null,
        datetime: null,
        terrain: null
        // TODO: createdBy will be added from logged in user
      }
    }
  }

  updateRide = (val) => {
    this.setState({ ride: val })
  }

  saveRide = () => {
    // TODO: Validate, post
    console.log('Save:', this.state.ride)
  }

  render () {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 24}
        style={styles.screen}
        behavior='padding'
      >
        <ScrollView style={styles.container}>
          <CreateRide
            ride={this.state.ride}
            style={styles.rideContainer}
            updateCallback={this.updateRide}
          />
        </ScrollView>
        <Button
          title='Create ride'
          onPress={this.saveRide}
          color={Colors.tintColor}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Constants.statusBarHeight // TODO enable once header is disabled
  },
  rideContainer: {
    flex: 1
  },
  screen: {
    flex: 1
  }
})
