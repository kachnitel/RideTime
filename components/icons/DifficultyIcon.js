import React from 'react';
import SvgSkiTrailRatingSymbolBlueSquare from './difficulty_icons/SkiTrailRatingSymbolBlueSquare';
import SvgSkiTrailRatingSymbolGreenCircle from './difficulty_icons/SkiTrailRatingSymbolGreenCircle';
import SvgSkiTrailRatingSymbolBlackDiamond from './difficulty_icons/SkiTrailRatingSymbolBlackDiamond';
import SvgSkiTrailRatingSymbolDoubleBlackDiamond from './difficulty_icons/SkiTrailRatingSymbolDoubleBlackDiamond';
import SvgSkiTrailRatingSymbolTerrainPark from './difficulty_icons/SkiTrailRatingSymbolTerrainPark';
import RideTimeIcon from './RideTimeIcon';

/**
 * @property d int 0-4
 *
 * @export
 * @class DifficultyIcon
 * @extends {RideTimeIcon}
 */
export default class DifficultyIcon extends RideTimeIcon {
  blue = '#069';
  green = '#393';
  orange = '#f90';
  black = 'black';

  icons = {
    0: SvgSkiTrailRatingSymbolGreenCircle,
    1: SvgSkiTrailRatingSymbolBlueSquare,
    2: SvgSkiTrailRatingSymbolBlackDiamond,
    3: SvgSkiTrailRatingSymbolDoubleBlackDiamond,
    4: SvgSkiTrailRatingSymbolTerrainPark
  };

  render() {
    iconColor = this.black;
    switch(this.props.d) {
      case 0:
        iconColor = this.green;
        break;
      case 1:
        iconColor = this.blue;
        break;
      case 4:
        iconColor = this.orange;
        break;
    }

    Icon = this.icons[this.props.d];
    if(Icon == undefined) {
      throw 'Difficulty Icon ' + this.props.d + ' is not defined'
    }

    return(
      <Icon
        {...this._getIconProps()}
        style={{color: iconColor, ...this.props.style}}
      />
    );
  }
}
