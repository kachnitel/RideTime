import React, { Component } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import RiderItem from './RiderItem';

class TouchableRiderItem extends Component {
  render() {
    return(
      <TouchableHighlight onPress={() => this.props.navigation.push(
        this.props.route || 'PublicProfile',
        this.props.rider
      )}>
        <View>
          <RiderItem
            rider={this.props.rider}
            style={this.props.style}
          />
        </View>
      </TouchableHighlight>
    )
  }
}

export default withNavigation(TouchableRiderItem);
