import React from 'react'
import { observer, inject, Provider } from 'mobx-react/native'
import {
  ActivityIndicator,
  ToastAndroid,
  View,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'
import { Header } from 'react-navigation'
import EventStore, { Event } from '../stores/EventStore.mobx'
import RideDetail from '../components/ride/RideDetail'
import Button from '../components/form/Button'
import ButtonIcon from '../components/form/ButtonIcon'
import HeaderRightView from '../components/navigation_header/HeaderRightView'
import ModalView from '../components/modal/ModalView'
import MenuModalOption from '../components/modal/MenuModalOption'
import Comments from '../components/ride/Comments'
import Colors from '../../constants/Colors'
import CountBadge from '../components/CountBadge'
import Layout from '../../constants/Layout'
import RequestList from '../components/ride/RequestList'

export default
@inject('EventStore')
@observer
class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let event: Event = navigation.getParam('event')
    let eventStore: EventStore = navigation.getParam('eventStore')
    return {
      title: event?.title ?? 'Loading event...',
      headerRight: !!event && <HeaderRightView>
        {event.isMember()
          ? navigation.getParam('menuButton')()
          : <Button
            title='Join'
            onPress={async () => {
              navigation.setParams({ loading: true })
              await event.join()
              navigation.setParams({ event: event, loading: false }) // refresh
              ToastAndroid.show('Joined ' + event.title, ToastAndroid.SHORT)
            }}
            disabled={eventStore.sentRequests.includes(event) || navigation.getParam('loading')}
          />}
      </HeaderRightView>
    }
  }

  event: Event
  // TODO: pull to refresh
  state = {
    loading: true,
    menuModalVisible: false,
    requestsModalVisible: false
  }

  constructor (props) {
    super(props)

    props.navigation.setParams({
      menuButton: this.headerMenuButton,
      eventStore: props.EventStore
    })
  }

  headerMenuButton = () => <View>
    <ButtonIcon
      icon='more-vert'
      onPress={this.showMenuModal}
    />
    {this.event?.requested.length > 0 && <CountBadge
      count={this.event.requested.length}
      style={styles.badge}
    />}
  </View>

  componentDidMount = async () => {
    let id = this.props.navigation.getParam('eventId')
    this.event = await this.props.EventStore.get(id)
    this.setState({ loading: false })
    this.props.navigation.setParams({ event: this.event })
    this.event.isMember() && await this.event.loadRequested()
    this.props.navigation.setParams({ event: this.event }) // HACK: updates badge
  }

  showMenuModal = () => this.setState({ menuModalVisible: true })
  hideMenuModal = () => this.setState({ menuModalVisible: false })

  menuModal = () => <ModalView
    isVisible={this.state.menuModalVisible}
    onBackdropPress={this.hideMenuModal}
    onBackButtonPress={this.hideMenuModal}
    onClose={this.hideMenuModal}
  >
    {this.event.private && <MenuModalOption
      onPress={() => {
        this.hideMenuModal()
        this.showRequestsModal()
      }}
      label='Join requests'
      description='See and approve users who would like to join this ride'
      icon='person-add'
      badge={this.event.requested.length}
    />}
    <MenuModalOption
      onPress={() => {
        this.event.leave()
        this.props.navigation.setParams({ event: this.event })
        this.hideMenuModal()
      }}
      label={'Leave ride'}
      description={'Leave ' + this.event.title}
      icon='event-busy'
    />
  </ModalView>

  showRequestsModal = () => this.setState({ requestsModalVisible: true })
  hideRequestsModal = () => this.setState({ requestsModalVisible: false })

  requestsModal = () => <ModalView
    isVisible={this.state.requestsModalVisible}
    onBackdropPress={this.hideRequestsModal}
    onBackButtonPress={this.hideRequestsModal}
    onClose={this.hideRequestsModal}
    style={styles.requestsModal}
  >
    <RequestList event={this.event} />
  </ModalView>

  render () {
    return (
      this.state.loading
        ? <ActivityIndicator />
        : <KeyboardAvoidingView
          style={styles.container}
          behavior='padding'
          keyboardVerticalOffset={Header.HEIGHT + 24}
        >
          <View style={styles.detail}>
            <Provider Event={this.event}>
              <RideDetail />
            </Provider>
          </View>
          <Comments event={this.event} style={styles.comments} />
          {this.menuModal()}
          {this.requestsModal()}
        </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  comments: {
    flex: 3,
    borderTopColor: Colors.tintColor,
    borderTopWidth: 1
  },
  detail: {
    flex: 7
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground
  },
  badge: {
    position: 'absolute',
    top: -Layout.window.hp(0.5),
    right: -Layout.window.hp(0.5)
  },
  requestsModal: {
    justifyContent: 'flex-end',
    margin: 0
  }
})
