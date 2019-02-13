import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import DrawerNavigator from './DrawerNavigator'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthStack from './AuthNavigator'

const MainNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Main: MainTabNavigator,
  AuthLoading: AuthLoadingScreen,
  App: DrawerNavigator,
  Auth: AuthStack
},
{
  initialRouteName: 'AuthLoading'
})

const AppContainer = createAppContainer(MainNavigator)

export default AppContainer
