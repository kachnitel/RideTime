import { createStackNavigator } from 'react-navigation' // Version can be specified in package.json
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'

const AuthStack = createStackNavigator(
  {
    SignIn: { screen: SignInScreen },
    SignUp: { screen: SignUpScreen }
  },
  {
    defaultRoute: 'SignIn',
    headerMode: 'none'
  }
)

export default AuthStack
