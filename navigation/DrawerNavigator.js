import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
// replace with OwnProfileScreen w/ edit in header?
import PublicProfileScreen from '../screens/PublicProfileScreen'; 
import HomeStack from './HomeNavigator';

const DrawerStack = createDrawerNavigator(
  {
    Home: HomeStack,
    Profile: PublicProfileScreen
  },
  {
    initialRouteName: 'Home',
    cardStyle: { backgroundColor: '#FFFFFF' }
  }
);


export default DrawerStack;
