import { NavigationActions } from 'react-navigation'

class NavigationService {
  navigator = null

  setRootNavigator = (navigator) => {
    this.navigator = navigator
  }

  navigate = (routeName, params) => {
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    )
  }
}

const navigationService = new NavigationService()
export default navigationService
