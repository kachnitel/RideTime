// import React from 'react';
// import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from '../screens/HomeScreen';
import RideDetailScreen from '../screens/RideDetailScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';

const RootStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    RideDetail: {screen: RideDetailScreen},
    PublicProfile: {screen: PublicProfileScreen}
  },
  {
    initialRouteName: 'Home',
  }
);


export default RootStack;
