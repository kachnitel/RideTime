import { createDrawerNavigator } from 'react-navigation';
import ProfileStack from './ProfileNavigator'; 
import HomeStack from './HomeNavigator';

const DrawerStack = createDrawerNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack
  },
  {
    initialRouteName: 'Home',
    cardStyle: { backgroundColor: '#FFFFFF' },
    headerMode: 'screen'
  }
);


export default DrawerStack;
