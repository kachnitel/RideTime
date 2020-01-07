import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import RideItemDetail from './RideItemDetail'
import Layout from '../../../constants/Layout'
import RidersListCompact from '../ride/RidersListCompact'

export default
@observer
class RideItem extends React.Component {
  render () {
    return (
      <View>
        <Text style={styles.title} numberOfLines={1}>
          {this.props.ride.title}
        </Text>
        <RideItemDetail ride={this.props.ride} />
        <RidersListCompact userIDs={this.props.ride.members.slice()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: Layout.window.hp(2.75)
  }
})
