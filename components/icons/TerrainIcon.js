import React from 'react'
import Colors from '../../constants/Colors'
import SvgBikeMountain from './bike_icons/BikeMountain'
import SvgBikeDownhill from './bike_icons/BikeDownhill'
import SvgBikeRoad from './bike_icons/BikeRoad'
import RideTimeIcon from './RideTimeIcon'
import PropTypes from 'prop-types'

/**
 * props:
 *  size: number
 *  terrain: [trail, road, downhill]
 */
export default class TerrainIcon extends RideTimeIcon {
  static icons = {
    trail: {
      label: 'Trail',
      icon: SvgBikeMountain
    },
    downhill: {
      label: 'Downhill',
      icon: SvgBikeDownhill
    },
    road: {
      label: 'Road',
      icon: SvgBikeRoad
    }
  };

  defaultTerrain = 'road';

  iconColor = Colors.iconColor;

  render () {
    let Icon = this.props.terrain && TerrainIcon.icons[this.props.terrain] !== undefined
      ? TerrainIcon.icons[this.props.terrain].icon
      : TerrainIcon.icons[this.defaultTerrain].icon
    if (Icon === undefined) {
      throw new Error('Terrain Icon ' + this.props.terrain + ' is not defined')
    }

    return (
      <Icon
        {...this._getIconProps()}
        style={{ color: this.iconColor, ...this.props.style }}
      />
    )
  }
}

TerrainIcon.propTypes = {
  style: PropTypes.any,
  terrain: PropTypes.oneOf(Object.keys(TerrainIcon.icons))
}
