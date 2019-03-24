import React from 'react'
import RideDetail from '../components/RideDetail'
import { observer, inject, Provider } from 'mobx-react/native'
import { Event } from '../stores/EventStore.mobx'
import { ActivityIndicator } from 'react-native'

export default
@inject('EventStore')
@observer
class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    }
  }

  event: Event
  state = { loading: true }

  async componentDidMount () {
    let eventId = this.props.navigation.getParam('id')
    this.event = await this.props.EventStore.get(eventId)
    this.setState({ loading: false })
  }

  render () {
    return (
      this.state.loading
        ? <ActivityIndicator />
        : <Provider Event={this.event}>
          <RideDetail navigation={this.props.navigation} />
        </Provider>
    )
  }
}
