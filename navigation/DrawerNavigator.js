import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import HomeStack from './HomeNavigator'
import Colors from '../constants/Colors'
import FriendStack from './FriendNavigator'
import DrawerContent from './DrawerContent'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Layout from '../constants/Layout'
import CountBadge from '../components/CountBadge'
import stores from '../stores/CollectionStores.singleton'

let getIcon = (name: String, color) => <Icon
  name={name}
  style={{ color: color }}
  size={Layout.window.hp(3.5)}
/>

let getLabel = (title: String, color: String, badgeCount: ?Number) =>
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <Text style={{
      marginVertical: Layout.window.hp(2),
      fontWeight: 'bold',
      color: color
    }}>{title}</Text>
    {!!badgeCount && <CountBadge count={badgeCount} style={{
      marginRight: Layout.window.wp(5)
    }} />}
  </View>

const DrawerStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({ tintColor }) => getLabel('Rides', tintColor, stores.event.invites.length),
        drawerIcon: ({ tintColor }) => getIcon('view-list', tintColor)
      }
    },
    Friends: {
      screen: FriendStack,
      navigationOptions: {
        drawerLabel: ({ tintColor }) => getLabel('Friends', tintColor, stores.user.friendRequests.length),
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
