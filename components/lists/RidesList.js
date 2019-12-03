import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import RideItem from '../list_items/RideItem'
import AlternatingStyleList from './AlternatingStyleList'
import { observer, inject } from 'mobx-react/native'

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
      event: item
    }
  )

  render () {
    return (
      <View style={styles.container}>
        <AlternatingStyleList
          items={this.props.rides}
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
