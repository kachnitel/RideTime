import React, { Component } from 'react'
import { observer, inject } from 'mobx-react/native'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import RidersList from './RidersList'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import RideItem from './RideItem'
import { RideDescription } from './RideDescription'
import UsersList from '../user/UsersList'
import TouchableWithModal from '../modal/TouchableWithModal'
import SearchInput from '../form/SearchInput'
import Header from '../Header'
import Icon from 'react-native-vector-icons/MaterialIcons'

/**
 * Ride Detail screen content
 */
export default
@inject('Event', 'UserStore')
@observer
class RideDetail extends Component {
  state = {
    inviteFilter: null
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.rideItem} >
          <RideItem ride={this.props.Event} />
        </View>
        <View style={{ ...styles.detailListItem, ...styles.membersListContainer }} >
          <RidersList
            userIDs={this.props.Event.members.slice()}
            headerText='Members' textColor={Colors.darkBackgroundText}
          />
          {/* Only show invite button if member */}
          {this.props.Event.isMember() && this.inviteButton()}
        </View>
        <View style={styles.detailListItem} >
          <RideDescription title='Planned Route' text={this.props.Event.route} />
        </View>
        <View style={styles.detailListItem} >
          <RideDescription title='Description' text={this.props.Event.description} />
        </View>
      </ScrollView>
    )
  }

  inviteButton = () => <TouchableWithModal
    modalContent={this.inviteModal()}
    containerStyle={styles.inviteButton}
    modalStyle={{
      justifyContent: 'flex-end',
      margin: 0
    }}
  >
    <View>
      <Icon style={styles.actionButtonIcon} name='person-add' />
      <Text style={styles.inviteText}>Invite</Text>
    </View>
  </TouchableWithModal>

  inviteModal = () => <ScrollView style={styles.modalContainer}>
    {/* REVIEW: 2 headers here */}
    <Header style={styles.inviteHeader}>Invite to {this.props.Event.title}</Header>
    <UsersList
      sections={[{
        title: 'Friends',
        data: this.getFilteredFriends(),
        actions: [{
          icon: 'person-add',
          action: (id) => this.props.Event.invite(id), // TODO: Toast
          disabled: (id) => (
            this.props.Event.isMember(id) ||
            this.props.Event.invited.includes(id)
          )
        }]
      }]}
      disableItemPress
    />
    <SearchInput
      onChangeText={this.handleSearchOnChange}
      style={styles.search}
      placeholder='Search by name'
    />
  </ScrollView>

  handleSearchOnChange = (text) => {
    this.setState({ inviteFilter: text })
  }

  getFilteredFriends = () => this.state.inviteFilter != null && this.state.inviteFilter.length > 0
    ? this.props.UserStore.currentUser.friends.filter(
      (id) => this.props.UserStore.getSync(id)
        .name.includes(this.state.inviteFilter))
    : this.props.UserStore.currentUser.friends
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  map: {
    height: Layout.window.hp(30)
  },
  rideItem: {
    backgroundColor: '#fff',
    padding: 0
  },
  detailListItem: {
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4),
    backgroundColor: Colors.darkBackground
  },
  membersListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inviteButton: {
    flexDirection: 'column',
    width: Layout.window.hp(11),
    height: Layout.window.hp(12.5),
    alignItems: 'center',
    marginTop: Layout.window.hp(5) // REVIEW:
  },
  actionButtonIcon: {
    fontSize: Layout.window.hp(4.5),
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.iconColor,
    width: Layout.window.hp(7.5),
    height: Layout.window.hp(7.5),
    borderRadius: Layout.window.hp(3.75)
  },
  inviteText: {
    textAlign: 'center',
    paddingTop: Layout.window.hp(1),
    flex: 1,
    color: '#fff'
  },
  inviteHeader: {
    color: Colors.tintColor,
    textAlign: 'center'
  },
  modalContainer: {
    width: '100%'
  },
  search: {
    textAlign: 'center'
  }
})
