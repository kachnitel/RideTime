import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import Colors from '../constants/Colors'
import CreateRide from '../components/new_ride/CreateRide';

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
        <CreateRide navigation={this.props.navigation} style={styles.container} />
        <Button
          title='Create ride'
          onPress={() => console.log('save')}
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
