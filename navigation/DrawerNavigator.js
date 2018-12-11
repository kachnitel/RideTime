import { createDrawerNavigator } from 'react-navigation';
import ProfileStack from './ProfileNavigator';
import HomeStack from './HomeNavigator';
import Colors from '../constants/Colors';

const DrawerStack = createDrawerNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack
  },
  {
    initialRouteName: 'Home',
    cardStyle: { backgroundColor: '#FFFFFF' },
    headerMode: 'screen',
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#ffffff'
      },
      headerTintColor: Colors.tintColor
    })
  }
);


export default DrawerStack;
