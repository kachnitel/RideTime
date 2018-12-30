import React from 'react'
import Colors from '../../constants/Colors'
import SvgBikeMountain from './bike_icons/BikeMountain'
import SvgBikeDownhill from './bike_icons/BikeDownhill'
import SvgBikeRoad from './bike_icons/BikeRoad'
import RideTimeIcon from './RideTimeIcon'

/**
 * props:
 *  size: number
 *  terrain: [trail, road]
 */
export default class TerrainIcon extends RideTimeIcon {
  bikes = {
    trail: SvgBikeMountain,
    downhill: SvgBikeDownhill,
    road: SvgBikeRoad
  };

  defaultBike = 'road';

  iconColor = Colors.iconColor;

  render () {
    let Icon = this.props.terrain ? this.bikes[this.props.terrain] : this.bikes[this.defaultBike]
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
