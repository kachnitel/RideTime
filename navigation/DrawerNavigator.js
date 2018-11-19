import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
// replace with OwnProfileScreen w/ edit in header?
// OwnProfileScreen would pull user info itself?
import PublicProfileScreen from '../screens/PublicProfileScreen'; 
import HomeStack from './HomeNavigator';

const DrawerStack = createDrawerNavigator(
  {
    Home: HomeStack,
    Profile: { 
      screen: PublicProfileScreen,
      params: {
        id: 4,
        name: "Hard Coded"
      }
    }
  },
  {
    initialRouteName: 'Home',
    cardStyle: { backgroundColor: '#FFFFFF' }
  }
);


export default DrawerStack;
