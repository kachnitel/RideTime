import { createDrawerNavigator } from 'react-navigation'
import ProfileStack from './ProfileNavigator'
import HomeStack from './HomeNavigator'
import Colors from '../constants/Colors'
import FriendStack from './FriendNavigator'

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
    })
  }
)

export default DrawerStack
