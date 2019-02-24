import React from 'react'
import SvgSkiTrailRatingSymbolBlueSquare from './difficulty_icons/SkiTrailRatingSymbolBlueSquare'
import SvgSkiTrailRatingSymbolGreenCircle from './difficulty_icons/SkiTrailRatingSymbolGreenCircle'
import SvgSkiTrailRatingSymbolBlackDiamond from './difficulty_icons/SkiTrailRatingSymbolBlackDiamond'
import SvgSkiTrailRatingSymbolDoubleBlackDiamond from './difficulty_icons/SkiTrailRatingSymbolDoubleBlackDiamond'
import SvgSkiTrailRatingSymbolTerrainPark from './difficulty_icons/SkiTrailRatingSymbolTerrainPark'
import RideTimeIcon from './RideTimeIcon'
import PropTypes from 'prop-types'

/**
 * @property d int 0-4
 *
 * @export
 * @class DifficultyIcon
 * @extends {RideTimeIcon}
 */
export default class DifficultyIcon extends RideTimeIcon {
  static colors = {
    blue: '#069',
    green: '#393',
    orange: '#f90',
    black: 'black'
  }

  static icons = {
    0: {
      class: SvgSkiTrailRatingSymbolGreenCircle,
      label: 'Beginner',
      color: DifficultyIcon.colors.green
    },
    1: {
      class: SvgSkiTrailRatingSymbolBlueSquare,
      label: 'Intermediate',
      color: DifficultyIcon.colors.blue
    },
    2: {
      class: SvgSkiTrailRatingSymbolBlackDiamond,
      label: 'Advanced',
      color: DifficultyIcon.colors.black
    },
    3: {
      class: SvgSkiTrailRatingSymbolDoubleBlackDiamond,
      label: 'Expert',
      color: DifficultyIcon.colors.black
    },
    4: {
      class: SvgSkiTrailRatingSymbolTerrainPark,
      label: 'Other',
      color: DifficultyIcon.colors.orange
    }
  }

  render () {
    let difficultyLevel = this.props.d

    let iconColor = DifficultyIcon.icons[difficultyLevel].color
    let Icon = DifficultyIcon.icons[difficultyLevel].class

    if (Icon === undefined) {
      throw new Error('Difficulty Icon ' + this.props.d + ' is not defined')
    }

    return (
      <Icon
        {...this._getIconProps()}
        style={{ color: iconColor, ...this.props.style }}
      />
    )
  }
}

DifficultyIcon.propTypes = {
  d: PropTypes.oneOf([0, 1, 2, 3, 4]).isRequired,
  style: PropTypes.any
}
