import React from 'react'
import RideDetail from '../components/RideDetail'
import { observer, inject, Provider } from 'mobx-react/native'
import { Event } from '../stores/EventStore.mobx'
import { ActivityIndicator } from 'react-native'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import HeaderRightView from '../components/HeaderRightView'
import { logger } from '../src/Logger'

export default
@inject('EventStore')
@observer
class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let event: Event = navigation.getParam('event')
    return {
      title: event.title,
      headerRight: <HeaderRightView>
        {event.isMember()
          ? <ButtonIcon // TODO: Three dot menu here (Leave, edit, ...?)
            icon='more-vert'
            onPress={() => logger.log('leave etc..id: ' + event.id)}
          />
          : <Button
            title='Join'
            onPress={() => event.join()} // event.join() + toast
          />}
      </HeaderRightView>
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
