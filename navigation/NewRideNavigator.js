import { createStackNavigator } from 'react-navigation' // Version can be specified in package.json
import RideDetailScreen from '../screens/RideDetailScreen'
import SelectLocationScreen from '../screens/SelectLocationScreen'
import CreateRideScreen from '../screens/CreateRideScreen'
import SelectRouteTrailsScreen from '../screens/SelectRouteTrailsScreen'

const NewRideStack = createStackNavigator(
  {
    SelectLocation: { screen: SelectLocationScreen },
    SelectRouteTrails: { screen: SelectRouteTrailsScreen },
    CreateRide: { screen: CreateRideScreen },
    RideDetail: { screen: RideDetailScreen }
  },
  {
    initialRouteName: 'SelectLocation',
    navigationOptions: {
      header: null
    }
  }
)

export default NewRideStack
