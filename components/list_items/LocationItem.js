import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Layout from '../../constants/Layout'
import LocationItemDetail from '../LocationItemDetail'
import PropTypes from 'prop-types'

export default class LocationItem extends React.Component {
  render () {
    return (
      <View style={{ ...styles.listItem, ...this.props.style }}>
        <Text style={{ ...styles.name, ...this.props.style }} numberOfLines={1} >
          {this.props.location.name}
        </Text>
        <LocationItemDetail location={this.props.location} />
      </View>
    )
  }
}

LocationItem.propTypes = {
  location: PropTypes.object,
  style: PropTypes.any
}

const styles = StyleSheet.create({
  name: {
    fontSize: Layout.window.hp(2.75),
    fontWeight: 'bold',
    flex: 1
  },
  listItem: {
    height: Layout.window.hp(15),
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4)
  }
})
