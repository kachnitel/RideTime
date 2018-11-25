import React from 'react';
import { Text, View } from 'react-native';
import { AllHtmlEntities } from 'html-entities';
// import Colors from '../../constants/Colors';

export default class RideTimeIcon extends React.Component {
  render() {
    /**
     * &#xe920 = person
     */
    switch(this.props.icon) {
      case 'person': 
        iconCode = '&#xe920';
        break;
      default: 
      iconCode = '✘';
      break;
    }
    
    entities = new AllHtmlEntities();
    symbol = entities.decode(iconCode);

    return(
      <View {...this.props}>
        <Text 
          style={[
            { 
              fontFamily: 'ride-time-icons', 
              fontSize: (this.props.size ? this.props.size : 30)
            },
            this.props.style
          ]}
        >
          {symbol}
        </Text>
      </View>
    );
  }
}
