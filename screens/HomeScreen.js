import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import WebViewLeaflet from 'react-native-webview-leaflet';
import mapLayers from '../mockMapLayers';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: null,
    headerMode: 'none'
  };

  constructor(props) {
    super(props);

    mapboxToken = 'pk.eyJ1IjoibXJkdWNrIiwiYSI6ImNqbjZzdTl6bzA2dWgzd29lZHF6ejk2NnMifQ.Z0xK0KdkuJ_t6JmA9oB9OQ';

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
          '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
      },
      currentLocation: {
        dw: [28.417839, -81.563808],
        bg: [37.23416573, -76.63999744],
        kd: [37.837329984, -77.440331572]
      }
    }
  }

  onLoad = (event) => {
    // log a message showing the map has been loaded
    console.log('onLoad received : ', event);
  
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
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 60}}>
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
        <View style={{ flex: 40}}>
          <Text>Hello world!</Text>
        </View>
        {/* Action button setup */}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-directions_bike" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-airport_shuttle" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-terrain" style={styles.actionButtonIcon} />
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
