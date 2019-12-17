import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import RideItem from './RideItem'
import AlternatingStyleList from '../lists/AlternatingStyleList'
import { Event } from '../../stores/EventStore.mobx'

export default
@inject('EventStore')
@observer
class RidesList extends Component {
  itemComponent = function (item, style) {
    return <RideItem ride={item} style={style} />
  }

  onItemPress = (item) => this.props.navigation.push(
    'RideDetail',
    {
      eventId: item.id
    }
  )

  render () {
    return (
      <View style={styles.container}>
        <AlternatingStyleList
          items={this.props.rides.sort((a: Event, b: Event) => a.datetime - b.datetime)}
          itemComponent={this.itemComponent}
          onItemPress={this.onItemPress}
          onRefresh={this.props.onRefresh}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
