import React from 'react'
import { observer, inject, Provider } from 'mobx-react/native'
import { ActivityIndicator, ToastAndroid, View } from 'react-native'
import { Event } from '../stores/EventStore.mobx'
import RideDetail from '../components/ride/RideDetail'
import Button from '../components/form/Button'
import ButtonIcon from '../components/form/ButtonIcon'
import HeaderRightView from '../components/navigation_header/HeaderRightView'
import ModalView from '../components/modal/ModalView'
import MenuModalOption from '../components/modal/MenuModalOption'

export default
@inject('EventStore')
@observer
class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let event: Event = navigation.getParam('event')
    let loaded = !!navigation.getParam('loaded')
    return {
      title: event.title,
      headerRight: loaded && <HeaderRightView>
        {event.isMember()
          ? <ButtonIcon
            icon='more-vert'
            onPress={navigation.getParam('showMenu')}
          />
          : <Button
            title='Join'
            onPress={() => {
              event.join()
              navigation.setParams({ event: event }) // refresh
              ToastAndroid.show('Joined ' + event.title, ToastAndroid.SHORT)
            }}
          />}
      </HeaderRightView>
    }
  }

  event: Event
  // TODO: pull to refresh
  state = {
    loading: true,
    menuModalVisible: false
  }

  constructor (props) {
    super(props)

    props.navigation.setParams({
      showMenu: this.showMenuModal
    })
  }

  componentDidMount = async () => {
    let { id } = this.props.navigation.getParam('event')
    this.event = await this.props.EventStore.get(id)
    this.setState({ loading: false })
    this.props.navigation.setParams({
      loaded: true,
      event: this.event
    })
  }

  showMenuModal = () => {
    this.setState({ menuModalVisible: true })
  }

  hideMenuModal = () => {
    this.setState({ menuModalVisible: false })
  }

  render () {
    return (
      this.state.loading
        ? <ActivityIndicator />
        : <View>
          <Provider Event={this.event}>
            <RideDetail />
          </Provider>
          <ModalView
            isVisible={this.state.menuModalVisible}
            onBackdropPress={this.hideMenuModal}
            onBackButtonPress={this.hideMenuModal}
          >
            <MenuModalOption
              onPress={() => {
                this.event.leave()
                this.props.navigation.setParams({ event: this.event })
                this.hideMenuModal()
              }}
              label={'Leave'}
            />
            <MenuModalOption
              onPress={this.hideMenuModal}
              label={'Close'}
            />
          </ModalView>
        </View>
    )
  }
}
