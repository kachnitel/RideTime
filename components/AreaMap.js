import React from 'react';
import WebViewLeaflet from 'react-native-webview-leaflet';
import mapLayers from '../mockMapLayers';


/*
 * TODO replace with MapView? & remove react-native-webview-leaflet from package.json
 * docs: https://docs.expo.io/versions/latest/sdk/map-view
 * docs: https://github.com/react-community/react-native-maps
 * location: https://docs.expo.io/versions/latest/sdk/location.html
import { MapView } from 'expo';

<MapView
style={{ flex: 1 }}
initialRegion={{
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.04231,
}}
/> */

export class AreaMap extends React.Component {
  constructor(props) {
    super(props);

    // use last known position
    // get from cache
    location = [49.355813, -123.036993];

    this.state = {
      currentLocation: location,
      locations: props.locations
    }
  }

  updateLocation = async () => {
    // TODO Async!!
    // https://github.com/reggie3/react-native-webview-leaflet/blob/8e5830fc23d121db19f51d7dea872d553c253ba5/App.js#L54
    await navigator.geolocation.getCurrentPosition(
      (loc) => {
        this.setState({currentLocation: [loc.coords.latitude, loc.coords.longitude]})
      },
      (error) => {
        console.log(error);
        console.log("LOCATION ERROR LOGGED");
      },
      {maximumAge: 5000}
    );

    this.webViewLeaflet.sendMessage({
      centerPosition: [...this.state.currentLocation]
      // TODO center once location is established
      // and then make available to parent once moved on map
      // Use inverse data flow to update parent so the list
      // of rides can reflect what the map shows
      // https://reactjs.org/docs/thinking-in-react.html#step-5-add-inverse-data-flow
    });
  }

  componentDidMount() {
    this.updateLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    locations = this.props.locations;

    if(locations !== null
      && locations !== undefined
      && locations.length > 0
      && prevState.locations !== locations
    ) {
      console.log("Map update locations");
      this.setState({locations: locations});

      // sendobject = {locations: [...locations]};
      // this.webViewLeaflet.sendMessage(sendobject);
    }

    if(prevProps.currentLocation !== this.props.currentLocation) {
      this.updateLocation();
    }
  }

  onLoad = () => {
    console.log('ONLOAD')
    this.setState(
      {mapState: { ...this.state.mapState, mapLoaded: true }},
      () => {
        // send an array of map layer information to the map
        this.webViewLeaflet.sendMessage({mapLayers});
      }
    );
  }

  render() {
    return <WebViewLeaflet
      ref={component => (this.webViewLeaflet = component)}
      onLoad={this.onLoad}
      eventReceiver={this} // the component that will receive map events

      // the center of the displayed map
      centerPosition={this.state.currentLocation}

      // a list of markers that will be displayed on the map
      markers={this.state.locations}

      // Optional: display a marker to be at a given location
      ownPositionMarker={{
        coords: this.state.currentLocation,
        icon: '◉', // {<Icon... />} or something
        size: [32, 32],
        animation: {
          name: "pulse",
          duration: "1",
          delay: 0,
          interationCount: "2"
        }
      }}

      zoom={8}

      // Optional: display a button that centers the map on the coordinates of ownPostionMarker. Requires that "ownPositionMarker" prop be set
      centerButton={true}
      showZoomControl={true}
      showAttributionControl={true}
      // useMarkerClustering={true} // FIXME breaks map
    />;
  }
}
