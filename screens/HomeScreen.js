// TODO move map to own Component ASAP
import React, {createRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LocationsProvider from '../providers/LocationsProvider';
import LocationsList from '../lists/LocationsList';
import { AreaMap } from '../components/AreaMap';
import { CreateRideButton } from '../components/CreateRideButton';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "RideTime"
  };

  constructor(props) {
    super(props);

    // get from cache
    location = [28.417839, -81.563808];
    this.mapRef = createRef();
    this.state = { 
      // use last known position
      currentLocation: location,
      markers: LocationsProvider.getLocations(location)
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
          <AreaMap currentLocation={this.state.currentLocation} locations={this.state.markers}/>
        </View>

        <View style={{flex: 65}}>
          <Text>Locations</Text>
          <LocationsList  data={this.state.markers}/>
        </View>

        <CreateRideButton />
      </View>
    );
  }
}

