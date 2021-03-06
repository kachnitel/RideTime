import React from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { Header, StackActions, NavigationActions } from 'react-navigation'
import CreateRide from '../components/ride/new_ride/CreateRide'
import { observer, inject, Provider } from 'mobx-react'
import Button from '../components/form/Button'
import { Event } from '../stores/EventStore.mobx'
import { Route } from '../stores/RouteStore.mobx'
import { Trail } from '../stores/TrailStore.mobx'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'

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
@inject('UserStore', 'EventStore', 'TrailStore')
@observer
class CreateRideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'New ride at ' + navigation.getParam('location').name
    }
  }

  event: Event

  constructor (props) {
    super(props)

    let route: Route = this.props.navigation.getParam('route')
    this.event = new Event(this.props.EventStore)
    this.event.updateTitle(route.title + ' ride')
    this.event.updateLocation(this.props.navigation.getParam('location').id)
    this.event.updateCreatedBy(this.props.UserStore.currentUser.id)
    this.event.updateDifficulty(route.difficulty || this.props.UserStore.currentUser.level)
    this.event.updateDescription(route.description && this.trimString(route.description, 2048))
    this.event.updateTerrain(this.props.UserStore.currentUser.bike)

    let routeString = route.trails.map( // TODO: discards actual route
      (trail: Trail) => this.props.TrailStore.get(trail).title
    ).join(' ⟫ ') // ⟫ / ⫸ / ⇨ / → / ▶
    this.event.updateRoute(this.trimString(routeString, 2048))

    this.state = {
      saving: false
    }
  }

  trimString = (string: String, length: Number) => string.length > length
    ? string.substr(0, 2045) + '...'
    : string

  saveRide = async () => {
    // TODO: Validate
    this.setState({ saving: true })
    await this.event.saveNew()
    this.props.UserStore.currentUser.addEvent(this.event.id)

    ToastAndroid.show('Ride created.', ToastAndroid.SHORT)

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Rides'
        }),
        NavigationActions.navigate({
          routeName: 'RideDetail',
          params: { eventId: this.event.id }
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  isValid = () => !!this.event.terrain &&
    !!this.event.title &&
    !!this.event.difficulty &&
    !!this.event.datetime

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
          title={this.state.saving ? 'Saving...' : 'Create ride'}
          onPress={this.saveRide}
          disabled={this.state.saving || !this.isValid()}
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
