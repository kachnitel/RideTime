// TODO remove from npm if I use SVG directly
import { AllHtmlEntities } from 'html-entities';
import React from 'react';
import { Text } from 'react-native';

/**
 * @property d int 0-4
 *
 * @export
 * @class DifficultyIcon
 * @extends {React.Component}
 */
export default class DifficultyIcon extends React.Component {
  render() {
    entities = new AllHtmlEntities();
    /**
     * &#xe900 = circle
     * &#xe901 = square
     * &#xe902 = diamond
     * &#xe903 = double diamond
     * &#xe904 = rectangle (misc)
     */
    symbol = entities.decode('&#xe90' + this.props.d);

    iconColor = 'black';
    switch(this.props.d) {
      case 0:
        iconColor = 'green';
        break;
      case 1:
        iconColor = 'blue';
        break;
      case 4:
        iconColor = 'orange';
        break;
    }

    return(
      <Text style={{
          fontFamily: 'trail-difficulty-icons',
          fontSize: (this.props.size || 36),
          color: iconColor,
          ...this.props.style
      }}>
        {symbol}
      </Text>
    );
  }
}
