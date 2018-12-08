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

    thickness = this.props.thickness ? this.props.thickness : 1.05;
    icon = React.Children.only(this.props.children);
    outline = React.cloneElement(icon, {
      size: icon.props.size*thickness,
      style: {...icon.props.style, ...this.props.outlineStyle}
    });

    return <View {...this.props}>
      {outline}
      {icon}
    </View>;
  }
}
