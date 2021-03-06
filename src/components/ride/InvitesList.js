import React, { Component } from 'react'
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { observer, inject, Provider } from 'mobx-react/native'
import RideItem from './RideItem'
import ButtonIcon from '../form/ButtonIcon'
import Header from '../Header'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import RideDetail from './RideDetail'
import { Event } from '../../stores/EventStore.mobx'
import InviteChoices from './InviteChoices'

export default
@inject('EventStore', 'HideModal')
@observer
class InvitesList extends Component {
  state = {
    detail: null
  }

  componentDidMount () {
    this.refresh()
  }

  refresh = () => {
    this.props.EventStore.loadInvites()
  }

  acceptInvite = (event) => {
    event.acceptInvite()
    this.setState({ detail: null })
  }

  declineInvite = (event) => {
    event.declineInvite()
    this.setState({ detail: null })
  }

  listComponent = () => <ScrollView style={styles.scroll}>
    <FlatList
      data={this.props.EventStore.invites}
      renderItem={this.itemComponent}
      ListEmptyComponent={<Text style={styles.listEmptyText}>No ride invites</Text>}
      keyExtractor={(item: Event) => 'event_' + item.id}
      onRefresh={this.refresh}
      refreshing={false}
      extraData={this.props.EventStore.invites.length}
    />
  </ScrollView>

  itemComponent = (item) => {
    let event = item.item
    return <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => this.setState({ detail: event })}
      >
        <RideItem ride={event} />
      </TouchableOpacity>
      {this.choicesContainer(event)}
    </View>
  }

  itemDetailModal = (event) => <View>
    <ScrollView style={styles.detailScroll}>
      <Provider Event={event}>
        <RideDetail />
      </Provider>
    </ScrollView>
    <View style={styles.detailChoices}>
      {this.choicesContainer(event)}
    </View>
  </View>

  choicesContainer = (event) => <InviteChoices
    options={[
      {
        icon: 'event-available',
        label: 'Join',
        action: () => this.acceptInvite(event)
      },
      {
        icon: 'clear',
        label: 'Dismiss',
        fade: true,
        action: () => this.declineInvite(event)
      }
    ]}
  />

  headerButton = () => <ButtonIcon
    icon={this.state.detail ? 'arrow-back' : 'close'}
    text={this.state.detail ? 'Back' : 'Close'}
    onPress={this.state.detail ? () => this.setState({ detail: null }) : this.props.HideModal}
    style={styles.headerButton}
    color={Colors.tintColor}
  />

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {this.headerButton()}
          <Header style={styles.header}>
            {this.state.detail === null ? 'Ride Invites' : this.state.detail.title}
          </Header>
        </View>
        {this.state.detail !== null
          ? this.itemDetailModal(this.state.detail)
          : this.listComponent()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  scroll: {
    maxHeight: Layout.window.hp(75)
  },
  detailChoices: {
    bottom: 0,
    width: '100%',
    // flex: 1,
    paddingTop: Layout.window.hp(2)
  },
  detailScroll: {
    height: Layout.window.hp(65)
  },
  header: {
    textAlign: 'center',
    color: Colors.tintColor,
    paddingBottom: Layout.window.hp(2),
    flex: 1
  },
  itemContainer: {
    borderTopColor: Colors.tintColor,
    borderTopWidth: 1,
    paddingBottom: Layout.window.hp(2)
  },
  headerButton: {
    paddingVertical: Layout.window.hp(0),
    backgroundColor: Colors.transparent,
    opacity: 0.75
  },
  headerContainer: {
    flexDirection: 'row'
  },
  listEmptyText: {
    textAlign: 'center',
    color: Colors.fadedText
  }
})
