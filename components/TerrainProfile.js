import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Layout from '../constants/Layout'

export default class TerrainProfile extends Component {
  render () {
    let distance = this.props.profile.get('distance') < 1000
      ? Math.round(this.props.profile.get('distance')) + 'm'
      : (this.props.profile.get('distance') / 1000).toFixed(2) + 'km'
    let climb = Math.round(this.props.profile.get('alt_climb'))
    let descent = Math.round(this.props.profile.get('alt_descent'))

    return <View style={styles.profileContainer}>
      <Icon name='map-marker-distance' style={this.props.style} />
      <Text style={{ ...this.props.style, ...styles.profileText }}>{distance}</Text>
      <Icon name='arrow-up-bold' color='red' />
      <Text style={{ ...this.props.style, ...styles.profileText }}>{climb} m</Text>
      <Icon name='arrow-down-bold' color='green' />
      <Text style={{ ...this.props.style, ...styles.profileText }}>{descent} m</Text>
    </View>
  }
}

TerrainProfile.propTypes = {
  profile: PropTypes.object,
  style: PropTypes.any
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.window.hp(1)
  },
  profileText: {
    paddingHorizontal: Layout.window.wp(1)
  }
})
