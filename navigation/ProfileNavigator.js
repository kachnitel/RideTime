import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import OwnProfileScreen from '../screens/OwnProfileScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import RideDetailScreen from '../screens/RideDetailScreen';
import Colors from '../constants/Colors';

const ProfileStack = createStackNavigator(
  {
    Profile: OwnProfileScreen,
    // EditProfile: EditProfileScreen,
    PublicProfile: {screen: PublicProfileScreen},
    RideDetail: {screen: RideDetailScreen}
  },
  {
    initialRouteName: 'Profile',
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#ffffff'
      },
      headerTintColor: Colors.tintColor
    })
  }
);


export default ProfileStack;
