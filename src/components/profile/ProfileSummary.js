import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import PreferredStyle from './profile-summary/PreferredStyle'
import RideCount from './profile-summary/RideCount'
import RiderLevel from './profile-summary/RiderLevel'
import { User } from '../../stores/UserStore.mobx'

export default class ProfileSummary extends Component {
  render () {
    return (
      <View {...this.props}>
        <RideCount count={this.props.user.events.length} />
        {/* var != null catches null|undefined (not 0) */}
        { this.props.user.level != null && <RiderLevel level={this.props.user.level} /> }
        { this.props.user.bike != null && <PreferredStyle terrain={this.props.user.bike} /> }
      </View>
    )
  }
}

ProfileSummary.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
}
