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
import { Event } from '../stores/EventStore.mobx'
import RideDetail from '../components/ride/RideDetail'
import Button from '../components/form/Button'
import ButtonIcon from '../components/form/ButtonIcon'
import HeaderRightView from '../components/navigation_header/HeaderRightView'
import ModalView from '../components/modal/ModalView'
import MenuModalOption from '../components/modal/MenuModalOption'
import Comments from '../components/ride/Comments'
import Colors from '../../constants/Colors'

export default
@inject('EventStore')
@observer
class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let event: Event = navigation.getParam('event')
    return {
      title: event?.title ?? 'Loading event...',
      headerRight: !!event && <HeaderRightView>
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
    let id = this.props.navigation.getParam('eventId')
    this.event = await this.props.EventStore.get(id)
    this.setState({ loading: false })
    this.props.navigation.setParams({
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
          <ModalView
            isVisible={this.state.menuModalVisible}
            onBackdropPress={this.hideMenuModal}
            onBackButtonPress={this.hideMenuModal}
            onClose={this.hideMenuModal}
          >
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
    // maxHeight: '75%',
    flex: 7
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground
  }
})
