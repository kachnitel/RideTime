import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import RideItem from './RideItem'
import AlternatingStyleList from '../lists/AlternatingStyleList'

export default
@inject('EventStore')
@observer
class RidesList extends Component {
  itemComponent = (item, style, section) => <View style={style}>
    <RideItem ride={item} style={style} />
    {section.footer !== undefined && section.footer(item)}
  </View>

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

RidesList.propTypes = {
  ...AlternatingStyleList.propTypes,
  navigation: PropTypes.any
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
