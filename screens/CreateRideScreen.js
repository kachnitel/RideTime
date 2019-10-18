import React from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import CreateRide from '../components/new_ride/CreateRide'
import { Header, StackActions, NavigationActions } from 'react-navigation'
import { observer, inject, Provider } from 'mobx-react'
import Button from '../components/Button'
import { Event } from '../stores/EventStore.mobx'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

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
@inject('UserStore', 'EventStore')
@observer
class CreateRideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'New ride at ' + navigation.getParam('name')
      // TODO: headerRight save
    }
  }

  event: Event

  constructor (props) {
    super(props)

    this.event = new Event(this.props.EventStore)
    this.event.updateTitle(this.props.navigation.getParam('name') + ' ride')
    this.event.updateLocation(this.props.navigation.getParam('id'))
    this.event.updateCreatedBy(this.props.UserStore.currentUser.id)
  }

  saveRide = async () => {
    // TODO: Validate
    await this.event.saveNew()

    ToastAndroid.show('Ride created.', ToastAndroid.SHORT)

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Rides'
        }),
        NavigationActions.navigate({
          routeName: 'RideDetail',
          params: { event: this.event }
        })
      ]
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
    flex: 1,
    width: '100%'
  },
  rideContainer: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: Layout.window.hp(2)
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.darkBackground
  }
})
