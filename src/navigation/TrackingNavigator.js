import { createStackNavigator } from 'react-navigation' // Version can be specified in package.json
import TrackingScreen from '../screens/TrackingScreen'
import Colors from '../../constants/Colors'

const TrackingStack = createStackNavigator(
  {
    Tracking: TrackingScreen
  },
  {
    initialRouteName: 'Tracking',
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.appBackground
      },
      headerTintColor: Colors.tintColor
    })
  }
)

export default TrackingStack
