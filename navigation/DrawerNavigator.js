import React from 'react'
import { createDrawerNavigator } from 'react-navigation'
import HomeStack from './HomeNavigator'
import Colors from '../constants/Colors'
import FriendStack from './FriendNavigator'
import DrawerContent from './DrawerContent'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Layout from '../constants/Layout'

let getIcon = (name: String, color) => <Icon
  name={name}
  style={{ color: color }}
  size={Layout.window.hp(3.5)}
/>

const DrawerStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: 'Rides',
        drawerIcon: ({ tintColor }) => getIcon('view-list', tintColor)
      }
    },
    Friends: {
      screen: FriendStack,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => getIcon('people-outline', tintColor)
      }
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#ffffff'
      },
      headerTintColor: Colors.tintColor
    }),
    contentComponent: DrawerContent
  }
)

export default DrawerStack
