import { createStackNavigator } from 'react-navigation' // Version can be specified in package.json
import Colors from '../../constants/Colors'
import PublicProfileScreen from '../screens/PublicProfileScreen'
import RideDetailScreen from '../screens/RideDetailScreen'
import RidesScreen from '../screens/RidesScreen'
import NewRideNavigator from './NewRideNavigator'

const HomeStack = createStackNavigator(
  {
    Rides: { screen: RidesScreen },
    RideDetail: { screen: RideDetailScreen },
    PublicProfile: { screen: PublicProfileScreen },
    NewRide: NewRideNavigator
  },
  {
    initialRouteName: 'Rides',
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.appBackground
      },
      headerTintColor: Colors.tintColor
    })
  }
)

export default HomeStack
