import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { AreaMap } from '../components/AreaMap'
import { CreateRideButton } from '../components/CreateRideButton'
import RidesList from '../components/lists/RidesList'
import DrawerButton from '../components/DrawerButton'
import { observer, inject } from 'mobx-react/native'

/**
 * TODO:
 * get rides for user - public + friends/groups allowed
 * filter by location (when a location is selected)
 *
 * @export
 * @class RidesScreen
 * @extends {React.Component}
 */
export default
@inject('EventStore', 'LocationStore')
@observer
class RidesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
      title: 'RideTime',
      drawerLabel: 'Home',
      headerLeft: <DrawerButton navigation={navigation} />
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  async componentDidMount () {
    this.props.LocationStore.populate()
    await this.loadRides()
  }

  onRidesRefresh = () => {
    this.loadRides()
  }

  async loadRides () {
    this.setState({ loading: true })
    await this.props.EventStore.populate()
    this.setState({ loading: false })
  }

  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 35 }}>
          <AreaMap
            // locations={this.props.LocationStore.list()}
          />
        </View>

        <View style={{ flex: 65 }}>
          {this.state.loading ? <ActivityIndicator /> : <RidesList
            navigation={this.props.navigation}
            onRefresh={this.onRidesRefresh}
          />}
        </View>

        <CreateRideButton navigation={this.props.navigation} />
      </View>
    )
  }
}
