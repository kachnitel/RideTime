import { createDrawerNavigator } from 'react-navigation'
import ProfileStack from './ProfileNavigator'
import HomeStack from './HomeNavigator'
import Colors from '../constants/Colors'
import FriendStack from './FriendNavigator'
import DrawerContent from './DrawerContent'

const DrawerStack = createDrawerNavigator(
  {
    Home: HomeStack,
    Friends: FriendStack,
    Profile: ProfileStack
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#ffffff'
      },
      headerTintColor: Colors.tintColor
    }),
    contentComponent: DrawerContent
  }
)

export default DrawerStack
