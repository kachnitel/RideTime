import PropTypes from 'prop-types'
import React, { Component } from 'react'
import OutlineIcon from './OutlineIcon'
import DifficultyIcon from './DifficultyIcon'
import Layout from '../../constants/Layout'

export default class OutlineDifficultyIcon extends Component {
  render () {
    if (Object.keys(DifficultyIcon.icons).map(Number).includes(this.props.difficulty)) {
      return (
        <OutlineIcon
          outlineStyle={{ color: this.props.outlineColor || '#fff' }}
          thickness={this.props.thickness || 1.1}
        >
          <DifficultyIcon
            d={this.props.difficulty}
            size={this.props.size || Layout.window.hp(3)}
          />
        </OutlineIcon>
      )
    }
    console.log('FIXME: Difficulty icon ' + this.props.difficulty + ' is not defined.')
    return null
  }
}

OutlineDifficultyIcon.propTypes = {
  difficulty: PropTypes.number,
  size: PropTypes.number
}
