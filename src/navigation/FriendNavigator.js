import { createStackNavigator } from 'react-navigation' // Version can be specified in package.json
import Colors from '../../constants/Colors'
import PublicProfileScreen from '../screens/PublicProfileScreen'
import FriendListScreen from '../screens/FriendListScreen'
import AddFriendScreen from '../screens/AddFriendScreen'

const FriendStack = createStackNavigator(
  {
    FriendList: { screen: FriendListScreen },
    AddFriend: { screen: AddFriendScreen },
    PublicProfile: { screen: PublicProfileScreen }
  },
  {
    initialRouteName: 'FriendList',
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.appBackground
      },
      headerTintColor: Colors.tintColor
    })
  }
)

export default FriendStack
