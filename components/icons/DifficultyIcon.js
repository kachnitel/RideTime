import React, { ReactPropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';
// TODO remove from npm if I use SVG directly
import { AllHtmlEntities } from 'html-entities';
import Colors from '../../constants/Colors';

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
      <View>
        <Text style={[
          { 
            fontFamily: 'trail-difficulty-icons', 
            fontSize: (this.props.size ? this.props.size : 36), 
            color: iconColor 
          }, 
          styles.shadowIcon
        ]}>
          {symbol}
        </Text>
      </View>
    );
  }
}

// TODO create a Colors.iconColor outline when on black background only
const styles = StyleSheet.create({
  shadowIcon: {
    textShadowColor: Colors.iconColor, 
    textShadowOffset: {width: 1, height: 0},
    textShadowRadius: 2
  }
})
