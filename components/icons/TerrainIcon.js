import React from 'react';
import { Text, View } from 'react-native';
import { AllHtmlEntities } from 'html-entities';
import Colors from '../../constants/Colors';

/**
 * props:
 *  size: number
 *  terrain: [trail, road]
 */
export default class TerrainIcon extends React.Component {
  render() {
    entities = new AllHtmlEntities();
    /**
     * &#xe910 = bike_mountain
     * &#xe911 = bike_road
     * ...downhill, other
     */
    switch(this.props.terrain) {
      case 'trail':
        iconCode = '&#xe910'
        break;
      case 'downhill': 
        iconCode = `&#xe912`;
        break;
      case 'road': 
        iconCode = '&#xe911';
        break;
      default: 
        iconCode = ''
        break;
    }

    symbol = entities.decode(iconCode);

    return(
      <Text 
        style={{ 
          fontFamily: 'ride-time-icons', 
          fontSize: (this.props.size ? this.props.size : 36), 
          color: Colors.iconColor 
        }}
      >
        {symbol}
      </Text>
    );
  }
}
