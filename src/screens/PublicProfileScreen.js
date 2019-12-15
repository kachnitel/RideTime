import React from 'react'
import { ActivityIndicator } from 'react-native'
import { observer, inject, Provider } from 'mobx-react/native'
import Profile from '../components/profile/Profile'

// TODO: Configure back button behavior to go back to ride
// Can use 'key' to go to the right card in stack if set
export default
@inject('UserStore')
@observer
class PublicProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: 'rgba(255,255,255,0.66);',
        width: 55,
        height: 50,
        borderBottomRightRadius: 5
      },
      headerTransparent: true
    }
  };

  constructor (props) {
    super(props)

    this.user = null
    this.state = {
      loading: true
    }
  }

  async componentDidMount () {
    let userId = this.props.navigation.getParam('id')
    this.user = await this.props.UserStore.get(userId)
    this.setState({ loading: false })
  }

  render () {
    return (
      this.state.loading
        ? <ActivityIndicator />
        : <Provider User={this.user}><Profile /></Provider>
    )
  }
}
