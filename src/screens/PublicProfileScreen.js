import React from 'react'
import { ActivityIndicator } from 'react-native'
import { observer, inject, Provider } from 'mobx-react/native'
import Profile from '../components/profile/Profile'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

// TODO: Configure back button behavior to go back to ride
// Can use 'key' to go to the right card in stack if set
export default
@inject('UserStore')
@observer
class PublicProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: Colors.listHeaderBackground,
        width: Layout.window.wp(15),
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
    this.user = await this.props.UserStore.getAsync(userId)
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
