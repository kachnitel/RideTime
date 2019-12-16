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
 * @icon DifficultyIcon
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
    3: {
      icon: SvgSkiTrailRatingSymbolGreenCircle,
      label: 'Beginner',
      color: DifficultyIcon.colors.green
    },
    4: {
      icon: SvgSkiTrailRatingSymbolBlueSquare,
      label: 'Intermediate',
      color: DifficultyIcon.colors.blue
    },
    5: {
      icon: SvgSkiTrailRatingSymbolBlackDiamond,
      label: 'Advanced',
      color: DifficultyIcon.colors.black
    },
    6: {
      icon: SvgSkiTrailRatingSymbolDoubleBlackDiamond,
      label: 'Expert',
      color: DifficultyIcon.colors.black
    },
    8: {
      icon: SvgSkiTrailRatingSymbolDoubleBlackDiamond,
      label: 'Pro',
      color: DifficultyIcon.colors.orange
    },
    0: {
      icon: SvgSkiTrailRatingSymbolTerrainPark,
      label: 'Other',
      color: DifficultyIcon.colors.orange
    }
  }

  render () {
    let difficultyLevel = this.props.d

    if (DifficultyIcon.icons[difficultyLevel] === undefined) {
      difficultyLevel = 0
    }

    let iconColor = DifficultyIcon.icons[difficultyLevel].color
    let Icon = DifficultyIcon.icons[difficultyLevel].icon

    return (
      <Icon
        {...this._getIconProps()}
        style={{ color: iconColor, ...this.props.style }}
      />
    )
  }
}

DifficultyIcon.propTypes = {
  d: PropTypes.oneOf(Object.keys(DifficultyIcon.icons).map(Number)).isRequired,
  style: PropTypes.any
}
