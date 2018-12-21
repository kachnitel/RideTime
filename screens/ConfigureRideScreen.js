import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class ConfigureRideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
// console.log(this.props.navigation);

    return (
      <View style={styles.container}>
        {/* Setup ride here - difficulty, trails, friends, ... */}
        <Text style={styles.content}>{this.props.navigation.getParam('name', 'NO NAME PLACE')}</Text>
        <Text style={styles.content}>Hello!</Text>
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
  },
  content: {
    flex: 1
  }
});
