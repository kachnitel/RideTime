import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SelectDifficulty from '../components/SelectDifficulty';

export default class ConfigureRideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Setup ride here - difficulty, trails, friends, ... */}
        <Text>{this.props.navigation.getParam('name', 'NO NAME PLACE')} ride</Text>
        <SelectDifficulty onSelect={this.setDifficulty} />
        {/* <Text style={styles.content}>Hello!</Text> */}
        {/* Done button */}
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
