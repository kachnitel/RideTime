import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import CountHeader from '../CountHeader'
import RidersList from '../lists/RidersList'
import ProfileHeader from './ProfileHeader'
import { Favourites } from './Favourites'
import Layout from '../../constants/Layout'
import { observer, inject } from 'mobx-react/native'

export default
@inject('User')
@observer
class Profile extends React.Component {
  render () {
    return (
      <ScrollView>
        <ProfileHeader user={this.props.User} />
        <RidersList userIDs={this.props.User.friends} style={styles.detailItem} headerText='Friends' />
        <CountHeader number={this.props.User.events.length} style={styles.detailItem}>Upcoming Rides</CountHeader>
        <Favourites text={this.props.User.favourites} style={styles.detailItem} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  detailItem: {
    paddingHorizontal: Layout.window.wp(4),
    paddingVertical: Layout.window.hp(1)
  }
})
