import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Colors from '../constants/Colors'
import CreateRide from '../components/new_ride/CreateRide'

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
      ride: null
    }
  }

  updateRide = (val) => {
    this.setState({ ride: val })
  }

  saveRide = () => {
    console.log('Save:', this.state.ride)
  }

  render () {
    return (
      <View style={styles.screen}>
        <CreateRide
          navigation={this.props.navigation}
          style={styles.container}
          updateCallback={this.updateRide}
        />
        <Button
          title='Create ride'
          onPress={this.saveRide}
          color={Colors.tintColor}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Constants.statusBarHeight // TODO enable once header is disabled
  },
  screen: {
    flex: 1
  }
})
