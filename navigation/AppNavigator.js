import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import DrawerNavigator from './DrawerNavigator'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthStack from './AuthNavigator'
import DevScreen from '../screens/DevScreen'
import ProfileStack from './ProfileNavigator'

const MainNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: DrawerNavigator,
  Auth: AuthStack,
  EditProfile: ProfileStack,
  Dev: DevScreen
},
{
  initialRouteName: 'AuthLoading'
})

const AppContainer = createAppContainer(MainNavigator)

export default AppContainer
