import React from 'react'
import RideDetail from '../components/RideDetail'
import { observer, inject, Provider } from 'mobx-react/native'
import { Event } from '../stores/EventStore.mobx'
import { ActivityIndicator } from 'react-native'
import Button from '../components/Button'

export default
@inject('EventStore')
@observer
class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerRight: (
        // TODO: if not member already
        <Button
          title='Join'
          onPress={() => console.log('join' + navigation.getParam('id'))}
        />
      )
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
          <RideDetail />
        </Provider>
    )
  }
}
