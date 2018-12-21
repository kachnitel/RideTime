import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import RideDetailScreen from '../screens/RideDetailScreen';
import SelectLocationScreen from '../screens/SelectLocationScreen';
import ConfigureRideScreen from '../screens/ConfigureRideScreen';

const CreateRideStack = createStackNavigator(
  {
    CreateRide: {screen: SelectLocationScreen},
    ConfigureRide: {screen: ConfigureRideScreen},
    RideDetail: {screen: RideDetailScreen},
  },
  {
    initialRouteName: 'CreateRide',
    cardStyle: { backgroundColor: '#FFFFFF' },
    headerMode: 'none'
  }
);


export default CreateRideStack;
