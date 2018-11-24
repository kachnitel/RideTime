import React from 'react';
import { Text, View } from 'react-native';
import { AllHtmlEntities } from 'html-entities';

export default class TerrainIcon extends React.Component {
  render() {
    entities = new AllHtmlEntities();
    /**
     * &#xe910 = bike_mountain
     * &#xe911 = bike_road
     * ...downhill, other
     */
    iconColor = '#85c131';
    switch(this.props.terrain) {
      case 'trail':
        iconCode = '&#xe910'
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
      <View {...this.props}>
        <Text 
          style={{ 
            fontFamily: 'ride-time-icons', 
            fontSize: (this.props.size ? this.props.size : 36), 
            color: iconColor 
          }}
        >
          {symbol}
        </Text>
      </View>
    );
  }
}
