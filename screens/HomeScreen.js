import React, {createRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import WebViewLeaflet from 'react-native-webview-leaflet';
import mapLayers from '../mockMapLayers';
import { mapboxToken } from '../secrets';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LocationsProvider from '../providers/LocationsProvider';
import LocationsList from '../lists/LocationsList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "RideTime"
  };

  constructor(props) {
    super(props);

    this.mapRef = createRef();
    this.state = { 
      mapCenterPosition: {
        name: 'OpenStreetMap',  // the name of the layer, this will be seen in the layer selection control
        checked: 'true',  // if the layer is selected in the layer selection control
        type: 'TileLayer',  // the type of layer as shown at https://react-leaflet.js.org/docs/en/components.html#raster-layers
        baseLayer: true,
        // url of tiles
        url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
        // attribution string to be shown for this layer
        attribution:
          '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
        centerPosition: [49.0010305292 -123.155249379]
      },
      // use last known position
      currentLocation: [28.417839, -81.563808],
      markers: []
    }
  }

  componentDidMount() {
    location = navigator.geolocation.getCurrentPosition(
      (loc) => {
        // console.log(loc);
        // console.log("LOCATION LOGGED");

        this.setState({currentLocation: [loc.coords.latitude, loc.coords.longitude]})
        this.webViewLeaflet.sendMessage({centerPosition: [loc.coords.latitude, loc.coords.longitude]});

        // update to reload nearby markers (eventually, is it even needed? has to be done when map moves)
        this.forceUpdate();
      },
      (error) => {
        console.log(error);
        console.log("ERROR LOGGED");
      },
      {maximumAge: 5000}
    );

    // console.log(LocationsProvider.getLocations());
    // this.setState({markers: LocationsProvider.getLocations()});
    // this.webViewLeaflet.sendMessage({locations: [...this.state.markers]})
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update");
    // console.log(prevState.markers);

    locations = LocationsProvider.getLocations();

    if(locations !== null && locations !== [] && JSON.stringify(prevState.markers) !== JSON.stringify(locations)) {
      console.log("SEND MARKERS");
      this.setState({markers: locations});
      this.webViewLeaflet.sendMessage({locations: [...this.state.markers]})
    }
  }

  onLoad = (event) => {
    // log a message showing the map has been loaded
    // console.log('onLoad received : ', event);
  
    // optionally set state
    this.setState(
      {
        ...this.state,
        mapState: { ...this.state.mapState, mapLoaded: true }
      },
      () => {
        // send an array of map layer information to the map
        this.webViewLeaflet.sendMessage({
          mapLayers
        });
      }
    );
  }

  render() {
    // console.log(this.state);
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 35}}>
          <WebViewLeaflet
            ref={component => (this.webViewLeaflet = component)}
            onLoad={this.onLoad}
            eventReceiver={this} // the component that will receive map events
            
            // the center of the displayed map
            centerPosition={this.state.mapCenterPosition}

            // a list of markers that will be displayed on the map
            markers={this.state.markers}

            // Optional: display a marker to be at a given location
            ownPositionMarker={{
              coords: this.state.currentLocation,
              icon: '◉',
              size: [16, 16],
              // style: {
              //   color: '#FF0000'
              // },
              animation: {
                name: "pulse",
                duration: "1",
                delay: 0,
                interationCount: "3"
              }
            }}

            // Optional: display a button that centers the map on the coordinates of ownPostionMarker. Requires that "ownPositionMarker" prop be set
            centerButton={true}
          />
        </View>

        <View style={{ flex: 65, backgroundColor: 'black'}}>
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

        <View style={{flex: 30}}>
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
