import React, {createRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import WebViewLeaflet from 'react-native-webview-leaflet';
import mapLayers from '../mockMapLayers';
import { mapboxToken } from '../secrets';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
// import geolocation from 'react';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "RideTime"
  };

  constructor(props) {
    super(props);

    this.mapRef = createRef();
    this.state = { 
      mapCenterPosition: {
        name: 'streets',  // the name of the layer, this will be seen in the layer selection control
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
      markers: {
        one: {
          id: 'testMarker', // The ID attached to the marker. It will be returned when onMarkerClicked is called
          coords: [28.417839, -81.563808], // Latitude and Longitude of the marker
          icon: 'md-location', // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
        
          // The child object, "animation", controls the optional animation that will be attached to the marker.
          // See below for a list of available animations
/*           animation: {
            name: animations[Math.floor(Math.random() * animations.length)],
            duration: Math.floor(Math.random() _ 3) + 1,
            delay: Math.floor(Math.random()) _ 0.5,
            interationCount
          }, */
          // optional size for this individual icon
          // will default to the WebViewLeaflet `defaultIconSize` property if not provided
          size: [64, 64],
        }
      }
    }
  }

  componentDidMount() {
    location = navigator.geolocation.getCurrentPosition(
      (loc) => {
        console.log(loc);
        console.log("LOCATION LOGGED");
        this.setState({currentLocation: loc.coords})
        // this.setState({mapCenterPosition: {centerPosition: loc.coords}});
        // this.webViewLeaflet.flyTo([loc.coords.latitude, loc.coords.longitude]);
        console.log("\nwebViewLeaflet\n");
        // console.log(this.webViewLeaflet.constructor.name);
        this.webViewLeaflet.sendMessage({centerPosition: [loc.coords.latitude, loc.coords.longitude]});
      },
      (error) => {
        console.log(error);
        console.log("ERROR LOGGED");
      }
      // {maximumAge: 5000}
    );
    // this.mapRef.current.leafletElement.flyTo([loc.coords.latitude, loc.coords.longitude]);

    // console.log("AAAAA");
    // console.log(location);
    // this.setState({mapCenterPosition: location.coords})
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
              icon: "❤️",
              size: [24, 24],
              animation: {
                name: "pulse",
                duration: ".5",
                delay: 0,
                interationCount: "infinite"
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
            PENISPENIS
          </Text>
          <Text style={{backgroundColor: '#ff0000'}}>
            Lat: {this.state.currentLocation.latitude}
          </Text>
          <Text style={{backgroundColor: '#ff0000'}}>
            Lon: {this.state.currentLocation.longitude}
          </Text>
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
