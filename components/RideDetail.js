import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import RidersList from '../components/lists/RidersList'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
// import { AreaMap } from './AreaMap'
import RideItem from './list_items/RideItem'
import { RideDescription } from './RideDescription'
import { observer, inject } from 'mobx-react/native'
import UsersList from './lists/UsersList'
import TouchableWithModal from './TouchableWithModal'

/**
 * Ride Detail screen content
 */
export default
@inject('Event', 'UserStore')
@observer
class RideDetail extends Component {
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
        {/* TODO: click to show confirmation to navigate
        Should be different location than riding area */}
        {/* <View style={styles.detailListItem} >
          <RideDescription title='Meeting Point' text={this.locationText} />
        </View> */}
        <View style={styles.detailListItem} >
          {/* Could be a list with difficulty icons/colors if we obtain a trail database
          or user could insert trail name and difficulty for each */}
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
  >
    <View>
      <Text style={styles.actionButtonIcon}>+</Text>
      <Text style={styles.inviteText}>Invite</Text>
    </View>
  </TouchableWithModal>

  /**
   * @memberof RideDetail
   */
  inviteModal = () => <ScrollView style={styles.modalContainer}>
    <UsersList
      users={this.props.UserStore.currentUser.friends}
      actions={[{
        icon: 'add-circle-outline',
        action: (id) => this.props.Event.invite(id), // TODO: Toast
        disabled: (id) => (
          this.props.Event.isMember(id) ||
          this.props.Event.invited.includes(id)
        )
      }]}
    />
  </ScrollView>
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
    fontSize: Layout.window.hp(5),
    color: '#fff',
    backgroundColor: Colors.iconColor,
    width: Layout.window.hp(7.5),
    height: Layout.window.hp(7.5),
    textAlign: 'center',
    borderRadius: Layout.window.hp(3.75)
  },
  inviteText: {
    textAlign: 'center',
    paddingTop: Layout.window.hp(1),
    flex: 1,
    color: '#fff'
  },
  modalContainer: {
    width: '100%'
  }
})
