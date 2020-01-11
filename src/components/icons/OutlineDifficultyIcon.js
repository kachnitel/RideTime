import PropTypes from 'prop-types'
import React, { Component } from 'react'
import OutlineIcon from './OutlineIcon'
import DifficultyIcon from './DifficultyIcon'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'

export default class OutlineDifficultyIcon extends Component {
  render () {
    return (
      <OutlineIcon
        outlineStyle={{ color: this.props.outlineColor || Colors.appBackground }}
        thickness={this.props.thickness || 1.1}
      >
        <DifficultyIcon
          d={this.props.difficulty}
          size={this.props.size || Layout.window.hp(3)}
        />
      </OutlineIcon>
    )
  }
}

OutlineDifficultyIcon.propTypes = {
  difficulty: PropTypes.number,
  size: PropTypes.number
}
