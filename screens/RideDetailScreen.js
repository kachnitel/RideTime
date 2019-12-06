import React from 'react'
import RideDetail from '../components/RideDetail'
import { observer, inject, Provider } from 'mobx-react/native'
import { Event } from '../stores/EventStore.mobx'
import { ActivityIndicator, ToastAndroid, View } from 'react-native'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import HeaderRightView from '../components/HeaderRightView'
import ModalView from '../components/ModalView'
import MenuModalOption from '../components/MenuModalOption'

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
    loading: false,
    menuModalVisible: false
  }

  constructor (props) {
    super(props)

    props.navigation.setParams({
      showMenu: this.showMenuModal
    })
    this.event = props.navigation.getParam('event')
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
