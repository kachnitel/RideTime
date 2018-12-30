import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import SelectDifficulty from '../components/new_ride/SelectDifficulty'

export default class CreateRideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  };

  render () {
    return (
      <View style={styles.container}>
        {/* Setup ride here - difficulty, trails, friends, ... */}
        <TextInput>{this.props.navigation.getParam('name', 'NO NAME PLACE')} ride</TextInput>
        <SelectDifficulty onSelect={this.setDifficulty} />
        {/* <Text style={styles.content}>Hello!</Text> */}
        {/* Done button */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // paddingTop: Constants.statusBarHeight // TODO enable once header is disabled
  }
})
