import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import RideItemDetail from '../RideItemDetail'
import Layout from '../../constants/Layout'
import RidersListCompact from '../lists/RidersListCompact'

export default class RideItem extends React.Component {
  render () {
    return (
      <View style={{ ...styles.listItem, ...this.props.style }}>
        <Text style={{ ...styles.title, ...this.props.style }}>
          {this.props.ride.title}
        </Text>
        <RideItemDetail
          ride={this.props.ride}
          style={this.props.style}
        />
        <RidersListCompact
          userIDs={this.props.ride.members}
          style={styles.ridersList}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: Layout.window.hp(2.75)
  },
  listItem: { // FIXME: justifyContent: 'space-between' doesn't work
    height: Layout.window.hp(17),
    paddingTop: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4)
  },
  ridersList: {
    paddingBottom: Layout.window.hp(1)
  }
})
