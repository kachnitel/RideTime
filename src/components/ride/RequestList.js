import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import UserItem from '../user/UserItem'
import InviteChoices from './InviteChoices'
import { Event } from '../../stores/EventStore.mobx'

export default class RequestList extends Component {
  state = {
    detail: null
  }

  componentDidMount () {
    this.refresh()
  }

  refresh = () => {
    this.props.event.loadRequested()
  }

  itemComponent = ({ item }) => <View>
    <UserItem id={item} />
    {/* TODO: Message option */}
    <InviteChoices
      options={[
        {
          icon: 'person-add',
          label: 'Accept',
          action: () => this.props.event.acceptRequest(item)
        },
        {
          icon: 'clear',
          label: 'Dismiss',
          action: () => this.props.event.declineRequest(item),
          fade: true
        }
      ]}
    />
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

  render () {
    return <View style={styles.container}>
      {/* {this.state.detail ? : } */}
      {this.listComponent()}
    </View>
  }
}

RequestList.propTypes = {
  event: PropTypes.instanceOf(Event)
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
})
