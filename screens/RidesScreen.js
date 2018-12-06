// TODO move map to own Component ASAP
import React, {createRef} from 'react';
import { View, StyleSheet } from 'react-native';
import LocationsProvider from '../providers/LocationsProvider';
import { RidesList } from '../components/lists/RidesList';
import { AreaMap } from '../components/AreaMap';
import { CreateRideButton } from '../components/CreateRideButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native';
import RidesProvider from '../providers/RidesProvider';


export default class RidesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
      title: "RideTime",
      drawerLabel: 'Home',
      headerLeft: (
        <TouchableHighlight
          onPress={() => navigation.toggleDrawer()}>
          <View>
            <Icon name='menu' />
          </View>
        </TouchableHighlight>
      ),
    };
  };

  constructor(props) {
    super(props);

    // get from cache
    location = [49.355813, -123.036993];
    this.mapRef = createRef();
    this.state = { 
      // use last known position
      currentLocation: location,
      locations: LocationsProvider.getLocations(location),
      rides: RidesProvider.getRides()
    }
  }

  componentDidMount() {
    // Async!! https://github.com/reggie3/react-native-webview-leaflet/blob/8e5830fc23d121db19f51d7dea872d553c253ba5/App.js#L54
    location = navigator.geolocation.getCurrentPosition(
      (loc) => {
        this.setState({currentLocation: [loc.coords.latitude, loc.coords.longitude]})

        // update to reload nearby markers (eventually, is it even needed? has to be done when map moves)
        this.forceUpdate();
      },
      (error) => {
        console.log(error);
        console.log("LOCATION ERROR LOGGED");
      },
      {maximumAge: 5000}
    );
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 35}}>
          <AreaMap currentLocation={this.state.currentLocation} locations={this.state.locations}/>
        </View>

        <View style={{flex: 65}}>
          <RidesList rides={this.state.rides}/>
        </View>

        <CreateRideButton />
      </View>
    );
  }
}
