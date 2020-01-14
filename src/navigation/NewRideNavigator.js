import { createStackNavigator } from 'react-navigation' // Version can be specified in package.json
import RideDetailScreen from '../screens/RideDetailScreen'
import SelectLocationScreen from '../screens/SelectLocationScreen'
import CreateRideScreen from '../screens/CreateRideScreen'
import SelectRouteTrailsScreen from '../screens/SelectRouteTrailsScreen'
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator.tsx'

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
    },
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal
    })
  }
)

export default NewRideStack
