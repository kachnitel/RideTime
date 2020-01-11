import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import RideItem from './RideItem'
import StyledSectionList from '../lists/StyledSectionList'

export default
@inject('EventStore')
@observer
class RidesList extends Component {
  itemComponent = (item, section) => <View>
    <RideItem ride={item} />
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
        <StyledSectionList
          {...this.props}
          itemComponent={this.itemComponent}
          onItemPress={this.onItemPress}
        />
      </View>
    )
  }
}

RidesList.propTypes = {
  ...StyledSectionList.propTypes,
  navigation: PropTypes.any
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
