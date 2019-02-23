import React from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import CreateRide from '../components/new_ride/CreateRide'
import { Header, StackActions, NavigationActions } from 'react-navigation'
import RidesProvider from '../providers/RidesProvider'
import { observer, inject } from 'mobx-react'
import Button from '../components/Button'

/**
 * Setup ride here - difficulty, trails, friends, ...
 *
 * TODO: Add a little "edit" icon at TextInput end
 *
 * @export
 * @class CreateRideScreen
 * @extends {React.Component}
 */
export default
@inject('UserStore')
@observer
class CreateRideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  constructor (props) {
    super(props)

    this.state = {
      ride: {
        title: this.props.navigation.getParam('name') + ' ride',
        description: '',
        route: '',
        locationId: this.props.navigation.getParam('id'),
        difficulty: null,
        datetime: null,
        terrain: null,
        createdBy: this.props.UserStore.userId
      }
    }
  }

  updateRide = (val) => {
    this.setState({ ride: val })
  }

  saveRide = () => {
    // TODO: Validate
    let ridesProvider = new RidesProvider()
    ridesProvider.addRide(this.state.ride)
      .then((result) => {
        ToastAndroid.show('Ride created.', ToastAndroid.SHORT)

        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({
            routeName: 'RideDetail',
            params: { id: result.id }
          })]
        })
        this.props.navigation.dispatch(resetAction)
      })
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
