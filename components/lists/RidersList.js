import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Header from '../Header'
import TouchableRiderItem from '../list_items/TouchableRiderItem'
import PropTypes from 'prop-types'

export class RidersList extends Component {
  riderItemTouchable = ({ item }) => (
    <TouchableRiderItem
      rider={item}
      style={styles.item}
    />
  )

  render () {
    return (
      <View>
        <Header style={styles.title}>Riders</Header>
        <FlatList
          data={this.props.riders}
          horizontal
          renderItem={this.riderItemTouchable}
          keyExtractor={(item, index) => 'index_' + index.toString()}
        />
      </View>
    )
  }
}

RidersList.propTypes = {
  riders: PropTypes.array
}

const styles = StyleSheet.create({
  title: {
    color: '#fff'
  },
  item: {
    color: '#fff'
  }
})
