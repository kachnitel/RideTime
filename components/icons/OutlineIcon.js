import React, { Component } from 'react';
import { View, Text } from 'react-native';

/**
 * create a clone of {this.props.children}
 * TODO only support one child
 * @prop outlineStyle
 */
export class OutlineIcon extends Component {
  render() {
    if(React.Children.count(this.props.children) > 1) {
      throw "OutlineIcon only accepts one child."
    }

    icon = React.Children.only(this.props.children);
    outline = React.cloneElement(icon, {
      size: icon.props.size*1.05,
      style: {...icon.props.style, ...this.props.outlineStyle}
    });

    return <View {...this.props}>
      {outline}
      {icon}
    </View>;
  }
}
