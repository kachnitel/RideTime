import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

/**
 * use props.outlineStyle{color} to change
 * @prop outlineStyle
 * @prop thicknedd
 */
export default class OutlineIcon extends Component {
  render () {
    if (React.Children.count(this.props.children) > 1) {
      throw new Error('OutlineIcon only accepts one child.')
    }

    let thickness = this.props.thickness || 1.075
    let icon = React.Children.only(this.props.children)
    let styles = stylesWProps(icon.props, thickness)
    let outline = React.cloneElement(icon, {
      size: icon.props.size * thickness,
      style: { ...icon.props.style, ...styles.iconStyle, ...this.props.outlineStyle }
    })

    return <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
      {outline}
      {icon}
    </View>
  }
}

OutlineIcon.propTypes = {
  children: PropTypes.any,
  outlineStyle: PropTypes.any,
  style: PropTypes.any,
  thickness: PropTypes.number
}

const stylesWProps = (props, thickness) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: props.size * thickness,
    height: props.size * thickness
  },
  iconStyle: {
    position: 'absolute'
  }
})
