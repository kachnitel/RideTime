import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react/native'
import RideItemDetail from './RideItemDetail'
import RidersListCompact from '../ride/RidersListCompact'
import Header from '../Header'

export default
@observer
class RideItem extends React.Component {
  render () {
    return (
      <View>
        <Header>{this.props.ride.title}</Header>
        <RideItemDetail ride={this.props.ride} />
        <RidersListCompact userIDs={this.props.ride.members.slice()} />
      </View>
    )
  }
}
