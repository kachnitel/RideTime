import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native'
import UserItem from '../user/UserItem'
import InviteChoices from './InviteChoices'
import { Event } from '../../stores/EventStore.mobx'
import ProfileHeader from '../profile/ProfileHeader'
import { inject, observer } from 'mobx-react/native'
import Layout from '../../../constants/Layout'

export default
@inject('UserStore')
@observer
class RequestList extends Component {
  state = {
    detail: null
  }

  componentDidMount () {
    this.refresh()
  }

  refresh = () => {
    this.props.event.loadRequested()
  }

  /* TODO: Message option */
  inviteChoices = (id) => {
    let options = [
      {
        icon: 'person-add',
        label: 'Accept',
        action: () => this.props.event.acceptRequest(id)
      },
      {
        icon: 'clear',
        label: 'Dismiss',
        action: () => this.props.event.declineRequest(id),
        fade: true
      }
    ]

    if (this.state.detail) {
      options.push({
        icon: 'arrow-back',
        label: 'Back',
        action: () => this.setState({ detail: null })
      })
    }
    return <InviteChoices
      options={options}
    />
  }

  itemComponent = ({ item }) => <View>
    <TouchableOpacity onPress={() => this.setState({ detail: item })}>
      <UserItem id={item} />
    </TouchableOpacity>
    {this.inviteChoices(item)}
  </View>

  listComponent = () => <FlatList
    data={this.props.event.requested}
    renderItem={this.itemComponent}
    ListEmptyComponent={<Text style={styles.listEmptyText}>No pending requests</Text>}
    keyExtractor={(id) => 'user_' + id}
    onRefresh={this.refresh}
    refreshing={false}
    extraData={this.props.event.requested.length}
  />

  detailComponent = () => <View>
    <View style={styles.detailComponentProfile}>

      <ProfileHeader
        user={this.props.UserStore.getSync(this.state.detail)}
      />
    </View>
    {this.inviteChoices(this.state.detail)}
  </View>

  render () {
    return <View style={styles.container}>
      {this.state.detail
        ? this.detailComponent()
        : this.listComponent()
      }
    </View>
  }
}

RequestList.propTypes = {
  event: PropTypes.instanceOf(Event)
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  detailComponentProfile: {
    paddingHorizontal: Layout.window.hp(1),
    paddingBottom: Layout.window.hp(1),
    borderRadius: Layout.window.hp(5)
  }
})
