import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import RideItem from './RideItem'
import AlternatingStyleList from '../lists/AlternatingStyleList'

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
          {...this.props}
          itemComponent={this.itemComponent}
          onItemPress={this.onItemPress}
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
