import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import RideDetailScreen from '../screens/RideDetailScreen';
import SelectLocationScreen from '../screens/SelectLocationScreen';

const CreateRideStack = createStackNavigator(
  {
    CreateRide: {screen: SelectLocationScreen},
    RideDetail: {screen: RideDetailScreen},
  },
  {
    initialRouteName: 'CreateRide',
    cardStyle: { backgroundColor: '#FFFFFF' },
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
);


export default CreateRideStack;
