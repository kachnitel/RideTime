import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import DifficultyIcon from '../../icons/DifficultyIcon'
import Colors from '../../../../constants/Colors'
import Layout from '../../../../constants/Layout'
import OutlineIcon from '../../icons/OutlineIcon'
import SummaryItem from './SummaryItem'

/**
 * TODO: Need to discuss design options
 * - iconOutline size 28, icon on top
 * - iconOutline size 24 ONLY
 * - iconOutline size 28, icon on top in "real" color
 */
export default class RiderLevel extends Component {
  render () {
    return (
      <SummaryItem title='Level'>
        <OutlineIcon outlineStyle={styles.iconOutline} thickness={1.15}>
          <DifficultyIcon d={this.props.level} size={Layout.window.hp(3.5)} style={styles.icon} />
        </OutlineIcon>
      </SummaryItem>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    color: Colors.darkBackground
  },
  iconOutline: {
    color: Colors.iconColor
  }
})
