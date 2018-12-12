import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import RidesScreen from '../screens/RidesScreen';
import RideDetailScreen from '../screens/RideDetailScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import Colors from '../constants/Colors';

const HomeStack = createStackNavigator(
  {
    Rides: {screen: RidesScreen},
    RideDetail: {screen: RideDetailScreen},
    PublicProfile: {screen: PublicProfileScreen}
  },
  {
    initialRouteName: 'Rides',
    cardStyle: { backgroundColor: '#FFFFFF' },
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#ffffff'
      },
      headerTintColor: Colors.tintColor
    })
  }
);


export default HomeStack;
