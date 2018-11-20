import React from 'react';
import WebViewLeaflet from 'react-native-webview-leaflet';
import mapLayers from '../mockMapLayers';
import { mapboxToken } from '../secrets';


/* 
 * TODO replace with MapView?
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

    this.state = { 
      // use last known position
      currentLocation: props.currentLocation, //array
      markers: props.locations
    }
  }

  componentDidMount() {
    this.webViewLeaflet.sendMessage({
      centerPosition: [...this.state.currentLocation]
      // TODO center once location is established 
      // and then make available to parent once moved on map?
      // Use inverse data flow to update parent so the list
      // of rides can reflect what the map shows
      // https://reactjs.org/docs/thinking-in-react.html#step-5-add-inverse-data-flow
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update");
    // console.log(prevState.markers);

    spots = this.props.locations;

    // not working, FIXME
    if(spots !== null && spots !== [] && JSON.stringify(prevState.markers) !== JSON.stringify(spots)) {
      console.log("SEND MARKERS");
      this.setState({markers: spots});

      sendobject = {locations: [...spots]};
      console.log(sendobject);
      // this.webViewLeaflet.sendMessage(sendobject);
    }

    if(prevProps.currentLocation !== this.props.currentLocation) {
      this.state.currentLocation = this.props.currentLocation;
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
    return <WebViewLeaflet
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
        icon: '◉', // {<Icon... />} or something
        size: [16, 16],
        // style: {
        //   color: '#FF0000'
        // },
        animation: {
          name: "pulse",
          duration: "1",
          delay: 0,
          interationCount: "2"
        }
      }}

      // Optional: display a button that centers the map on the coordinates of ownPostionMarker. Requires that "ownPositionMarker" prop be set
      centerButton={true}
      showZoomControl={true}
    />;
  }
}
