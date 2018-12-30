import { createSwitchNavigator } from 'react-navigation'
// import HomeNavigator from './HomeNavigator';
import DrawerNavigator from './DrawerNavigator'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Main: MainTabNavigator,
  Main: DrawerNavigator
})
