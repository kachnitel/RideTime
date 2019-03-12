import React from 'react'
import Profile from '../components/profile/Profile'
import RidersProvider from '../providers/RidersProvider'

// TODO: Configure back button behavior to go back to ride
// Can use 'key' to go to the right card in stack if set
export default class PublicProfileScreen extends React.Component {
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

    this.state = {
      user: null
    }
  }

  componentDidMount () {
    let provider = new RidersProvider()
    let userId = this.props.navigation.getParam('id')
    provider.getUser(userId)
      .then((result) => {
        this.setState({ user: result })
      })
  }

  render () {
    return (
      this.state.user && <Profile user={this.state.user} />
    )
  }
}
