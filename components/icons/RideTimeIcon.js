import React from 'react';
import SvgPersonIcon from './PersonIcon';

export default class RideTimeIcon extends React.Component {
  icons = {
    person: SvgPersonIcon
  }

  render() {
    if(this.icons[this.props.icon] == undefined) {
      throw 'Icon "' + this.props.icon + '" is not defined'
    }
    Icon = this.icons[this.props.icon];

    // FIXME duplicated from DifficultyIcon
    size = this.props.size;
    // current TerrainIcons are based on 600px

    return(
      <Icon
        {...this.props}
        viewBox="0 0 600 600"
        width={size}
        height={size}
        style={{color: iconColor, ...this.props.style}}
      />
    );
  }
}
