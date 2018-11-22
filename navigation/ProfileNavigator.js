import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import OwnProfileScreen from '../screens/OwnProfileScreen';

const ProfileStack = createStackNavigator(
  {
    Profile: OwnProfileScreen,
    // EditProfile: EditProfileScreen
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
