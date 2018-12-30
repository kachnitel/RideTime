import { createStackNavigator } from 'react-navigation' // Version can be specified in package.json
import RideDetailScreen from '../screens/RideDetailScreen'
import SelectLocationScreen from '../screens/SelectLocationScreen'
import CreateRideScreen from '../screens/CreateRideScreen'

const NewRideStack = createStackNavigator(
  {
    SelectLocation: { screen: SelectLocationScreen },
    CreateRide: { screen: CreateRideScreen },
    RideDetail: { screen: RideDetailScreen }
  },
  {
    initialRouteName: 'SelectLocation',
    cardStyle: { backgroundColor: '#FFFFFF' },
    headerMode: 'none'
  }
)

export default NewRideStack
