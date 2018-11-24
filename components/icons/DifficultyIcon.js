import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Font } from 'expo';
// TODO remove from npm if I use SVG directly
import { AllHtmlEntities } from 'html-entities';

/**
 * TODO 
 * load in App.json and then pass the state down to icon component
 * can I watch the 'global' state from deeply nested component?
 */
export default class DifficultyIcon extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'trail-difficulty-icons': require('../../assets/fonts/trail-difficulty-icons.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

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
      <View {...this.props}>
        {
          this.state.fontLoaded ? (
            <Text 
              style={{ 
                fontFamily: 'trail-difficulty-icons', 
                fontSize: (this.props.size ? this.props.size : 36), 
                color: iconColor 
              }}
            >
              {symbol}
            </Text>
          ) : null
        }
      </View>
    );
  }
}
