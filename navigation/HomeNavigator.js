import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import RidesScreen from '../screens/RidesScreen';
import RideDetailScreen from '../screens/RideDetailScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';

const HomeStack = createStackNavigator(
  {
    Rides: {screen: RidesScreen},
    RideDetail: {screen: RideDetailScreen},
    PublicProfile: {screen: PublicProfileScreen}
  },
  {
    initialRouteName: 'Rides',
    cardStyle: { backgroundColor: '#FFFFFF' }
  }
);


export default HomeStack;
