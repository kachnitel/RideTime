import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import OwnProfileScreen from '../screens/OwnProfileScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';

const ProfileStack = createStackNavigator(
  {
    Profile: OwnProfileScreen,
    // EditProfile: EditProfileScreen,
    PublicProfile: {screen: PublicProfileScreen}
  },
  {
    initialRouteName: 'Profile',
    // FIXME duplicated from HomeNavigator
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#ffffff'},
      headerTintColor: '#0C5E14'
    })
  }
);


export default ProfileStack;
