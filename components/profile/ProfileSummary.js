import React, { Component } from 'react'
import { View } from 'react-native'
import PreferredStyle from './profile-summary/PreferredStyle'
import RideCount from './profile-summary/RideCount'
import RiderLevel from './profile-summary/RiderLevel'

export default class ProfileSummary extends Component {
  render () {
    return (
      <View {...this.props}>
        <RideCount count={10} />
        {/* var != null catches null|undefined (not 0) */}
        { this.props.user.level != null && <RiderLevel level={this.props.user.level} /> }
        { this.props.user.favTerrain != null && <PreferredStyle terrain={this.props.user.favTerrain} /> }
      </View>
    )
  }
}
