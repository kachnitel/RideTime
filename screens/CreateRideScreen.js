import React from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import CreateRide from '../components/new_ride/CreateRide'
import { Header, StackActions, NavigationActions } from 'react-navigation'
import { observer, inject, Provider } from 'mobx-react'
import Button from '../components/Button'
import { Event } from '../stores/EventStore.mobx'

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
@inject('ApplicationStore', 'EventStore')
@observer
class CreateRideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  event: Event

  constructor (props) {
    super(props)

    this.event = new Event(this.props.EventStore)
    this.event.updateTitle(this.props.navigation.getParam('name') + ' ride')
    this.event.updateLocation(this.props.navigation.getParam('id'))
    this.event.updateCreatedBy(this.props.ApplicationStore.userId)
  }

  saveRide = async () => {
    // TODO: Validate
    await this.event.saveNew()

    ToastAndroid.show('Ride created.', ToastAndroid.SHORT)

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: 'RideDetail',
        params: { id: this.event.id }
      })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 24}
        style={styles.screen}
        behavior='padding'
      >
        <ScrollView style={styles.container}>
          <Provider Event={this.event}>
            <CreateRide
              style={styles.rideContainer}
              updateCallback={this.updateRide}
            />
          </Provider>
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
