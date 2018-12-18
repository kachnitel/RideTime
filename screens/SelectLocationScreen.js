import React from 'react';
import { StyleSheet, View } from 'react-native';
import LocationPicker from '../components/LocationPicker';
import LocationsProvider from '../providers/LocationsProvider';


export default class SelectLocationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      locations: LocationsProvider.getLocations()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Select location here */}
        <LocationPicker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // paddingTop: Constants.statusBarHeight // TODO enable once header is disabled
  }
});
