import { createStackNavigator } from 'react-navigation' // Version can be specified in package.json
import SignInScreen from '../screens/SignInScreen'

const AuthStack = createStackNavigator(
  {
    SignIn: { screen: SignInScreen }
  },
  {
    headerMode: 'none'
  }
)

export default AuthStack
