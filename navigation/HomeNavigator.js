import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from '../screens/HomeScreen';
import RideDetailScreen from '../screens/RideDetailScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';

const HomeStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    RideDetail: {screen: RideDetailScreen},
    PublicProfile: {screen: PublicProfileScreen}
  },
  {
    initialRouteName: 'Home',
    cardStyle: { backgroundColor: '#FFFFFF' },
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#0C9E14'}
    })
  }
);


export default HomeStack;
