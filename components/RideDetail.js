import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native'
import { RidersList } from '../components/lists/RidersList'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { AreaMap } from './AreaMap'
import RideItem from './list_items/RideItem'
import { RideDescription } from './RideDescription'
import { observer, inject } from 'mobx-react/native'
import ModalView from './ModalView'
import UsersList from './lists/UsersList'

/**
 * Ride Detail screen content
 */
export default
@inject('Event', 'UserStore')
@observer
class RideDetail extends Component {
  locationText = JSON.stringify(this.props.Event.location.gps);

  state = {
    modalVisible: false
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.map} >
          <AreaMap currentLocation={this.props.Event.location.gps} />
        </View>
        <View style={styles.rideItem} >
          <RideItem ride={this.props.Event} />
        </View>
        <View style={{ ...styles.detailListItem, ...styles.membersListContainer }} >
          <RidersList riders={this.props.Event.members} />
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
        {this.inviteModal()}
      </ScrollView>
    )
  }

  inviteButton = () => <View style={styles.inviteButton}>
    <TouchableNativeFeedback
      onPress={() => this.showModal()}
    >
      <View>
        <Text style={styles.actionButtonIcon}>+</Text>
        <Text style={styles.inviteText}>Invite</Text>
      </View>
    </TouchableNativeFeedback>
  </View>

  /**
   * TODO: Make a component
   *
   * @memberof RideDetail
   */
  inviteModal = () => <ModalView
    isVisible={this.state.modalVisible}
    onBackButtonPress={this.hideModal}
    onBackdropPress={this.hideModal}
  >
    <ScrollView style={styles.modalContainer}>
      <UsersList
        users={this.props.UserStore.currentUser.friends}
        actions={[{
          icon: 'add-circle-outline',
          action: (id) => this.props.Event.invite(id), // TODO: Toast
          disabled: (id) => (
            this.props.Event.members.find((item) => item.id === id) !== undefined ||
            this.props.Event.invited.indexOf(id) !== -1
          )
        }]}
      />
    </ScrollView>
  </ModalView>
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
    flexDirection: 'row'
  },
  inviteButton: {
    flexDirection: 'column',
    marginLeft: 'auto',
    width: Layout.window.hp(11),
    height: Layout.window.hp(12.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Layout.window.hp(4.75) // REVIEW:
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
