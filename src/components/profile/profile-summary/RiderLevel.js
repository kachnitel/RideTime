import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import DifficultyIcon from '../../icons/DifficultyIcon'
import sharedStyles from './Style'
import Title from './Title'
import Colors from '../../../../constants/Colors'
import Layout from '../../../../constants/Layout'
import OutlineIcon from '../../icons/OutlineIcon'

/**
 * TODO: Need to discuss design options
 * - iconBg size 28, icon on top
 * - iconBg size 24 ONLY
 * - iconBg size 28, icon on top in "real" color
 */
export default class RiderLevel extends Component {
  render () {
    return (
      <View style={styles.summaryItem}>
        <Title style={styles.title}>Level</Title>
        <OutlineIcon outlineStyle={styles.iconBg} style={styles.content} thickness={1.15}>
          <DifficultyIcon d={this.props.level} size={Layout.window.hp(3.5)} style={styles.icon} />
        </OutlineIcon>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...sharedStyles,
  icon: {
    color: Colors.darkBackground
  },
  iconBg: {
    color: Colors.iconColor
  }
})