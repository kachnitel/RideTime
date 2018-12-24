import React from 'react';
import Colors from '../../constants/Colors';
import SvgBikeMountain from './bike_icons/BikeMountain';
import SvgBikeDownhill from './bike_icons/BikeDownhill';
import SvgBikeRoad from './bike_icons/BikeRoad';

/**
 * props:
 *  size: number
 *  terrain: [trail, road]
 */
export default class TerrainIcon extends React.Component {
  bikes = {
    trail: SvgBikeMountain,
    downhill: SvgBikeDownhill,
    road: SvgBikeRoad
  };

  defaultBike = 'road';

  iconColor = '#85c131';

  render() {
    Icon = this.props.terrain ? this.bikes[this.props.terrain] : this.bikes[this.defaultBike];
    if(Icon == undefined) {
      throw 'Terrain Icon ' + this.props.terrain + ' is not defined'
    }

    // FIXME duplicated from DifficultyIcon
    size = this.props.size;
    // current TerrainIcons are based on 600px

    return(
      <Icon
        {...this.props}
        viewBox="0 0 600 600"
        width={size}
        height={size}
        style={{color: this.iconColor, ...this.props.style}}
      />
    );
  }
}
