import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import OwnProfileScreen from '../screens/OwnProfileScreen';

const ProfileStack = createStackNavigator(
  {
    Profile: OwnProfileScreen,
    // EditProfile: EditProfileScreen
  },
  {
    initialRouteName: 'Profile',
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: '#0C9E14'}
    })
  }
);


export default ProfileStack;
