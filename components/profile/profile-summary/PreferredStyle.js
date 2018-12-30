import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import sharedStyles from './Style'
import Title from './Title'
import TerrainIcon from '../../icons/TerrainIcon'
import Layout from '../../../constants/Layout'

export default class PreferredStyle extends Component {
  render () {
    return (
      <View style={styles.summaryItem}>
        <Title style={styles.title}>Style</Title>
        <View style={styles.content}>
          <TerrainIcon terrain={this.props.terrain} size={Layout.window.hp(3.5)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...sharedStyles
})
