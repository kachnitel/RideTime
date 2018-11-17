// TODO move map to own Component ASAP
import React, {createRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LocationsProvider from '../providers/LocationsProvider';
import LocationsList from '../lists/LocationsList';
import { AreaMap } from '../components/AreaMap';

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
      // 
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

    // console.log(LocationsProvider.getLocations());
    // this.setState({markers: LocationsProvider.getLocations()});
    // this.webViewLeaflet.sendMessage({locations: [...this.state.markers]})
  }

  render() {
    // console.log(this.state);
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 25}}>
          <AreaMap currentLocation={this.state.currentLocation} locations={this.state.markers}/>
        </View>

        <View style={{ flex: 25, backgroundColor: 'black'}}>
          <Text style={{color: 'pink'}}>Rides list here.
            Default within 24hr start
            Some filters etc..
            Filter at top header?
          </Text>
          <Text style={{backgroundColor: '#ff0000'}}>
            Lat: {this.state.currentLocation[0]}
          </Text>
          <Text style={{backgroundColor: '#ff0000'}}>
            Lon: {this.state.currentLocation[1]}
          </Text>
        </View>

        <View style={{flex: 50}}>
          <Text>Locations(just here for map testing)</Text>
          <LocationsList  data={this.state.markers}/>
        </View>

        {/* Action button setup */}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Road ride" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-stopwatch" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Shuttle" onPress={() => {}}>
            <Icon name="md-car" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Pedal" onPress={() => {}}>
            <Icon name="md-bicycle" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
