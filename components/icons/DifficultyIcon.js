import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Font } from 'expo';
import { AllHtmlEntities } from 'html-entities';

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
    symbol = entities.decode('&#xe90' + this.props.d);
    console.log(symbol);
    iconColor = 'black';
    switch(this.props.d) {
      case 0:
        iconColor = 'green';
        break;
      case 1: 
        iconColor = 'blue';
        break;
      case 4: 
        iconColor = 'yellow';
        break;
    }

    return(
      <View>
        {
          this.state.fontLoaded ? (
            <Text style={{ fontFamily: 'trail-difficulty-icons', fontSize: 24 , color: iconColor}}>
              {symbol}
            </Text>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    // flex: 1,
    height: 32,
    width: 32
  }
});
