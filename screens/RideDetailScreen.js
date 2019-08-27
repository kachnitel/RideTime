import React from 'react'
import RideDetail from '../components/RideDetail'
import { observer, inject, Provider } from 'mobx-react/native'
import { Event } from '../stores/EventStore.mobx'
import { ActivityIndicator } from 'react-native'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'

export default
@inject('EventStore')
@observer
class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let event = navigation.getParam('event')
    return {
      title: event.title,
      headerRight: (
        event.isMember()
          ? <ButtonIcon // TODO: Three dot menu here (Leave, edit, ...?)
            icon='more-vert'
            onPress={() => console.log('invite users to' + event.id)}
          />
          : <Button
            title='Join'
            onPress={() => console.log('join' + event.id)} // event.join() + toast
          />
      )
    }
  }

  event: Event
  state = { loading: true } // TODO: pull to refresh

  async componentDidMount () {
    this.event = this.props.navigation.getParam('event')
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
