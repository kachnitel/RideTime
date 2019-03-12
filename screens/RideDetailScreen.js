import React from 'react'
import { RideDetail } from '../components/RideDetail'
import RidesProvider from '../providers/RidesProvider'

export default class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      ride: null
    }
  }

  componentDidMount () {
    let provider = new RidesProvider()
    let rideId = this.props.navigation.getParam('id')
    provider.getRide(rideId)
      .then((result) => {
        this.setState({ ride: result })
      })
  }

  render () {
    return (
      // FIXME: loading?
      this.state.ride && <RideDetail ride={this.state.ride} navigation={this.props.navigation} />
    )
  }
}
