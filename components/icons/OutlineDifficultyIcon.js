import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import OutlineIcon from './OutlineIcon'
import DifficultyIcon from './DifficultyIcon'
import Layout from '../../constants/Layout'

export default class OutlineDifficultyIcon extends Component {
  render () {
    if (Object.keys(DifficultyIcon.icons).map(Number).includes(this.props.difficulty)) {
      return (
        <OutlineIcon
          outlineStyle={styles.iconOutline}
          thickness={1.1}
          style={styles.difficultyIcon}
        >
          <DifficultyIcon
            d={this.props.difficulty}
            size={Layout.window.hp(3)}
          />
        </OutlineIcon>
      )
    }
    console.log('FIXME: Difficulty icon ' + this.props.difficulty + ' is not defined.')
    return null
  }
}

const styles = StyleSheet.create({
  difficultyIcon: {
    // paddingRight: Layout.window.wp(1)
  },
  iconOutline: {
    color: '#fff'
  }
})
