import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default class CountIcon extends React.Component {
  render () {
    let child = React.Children.only(this.props.children)

    return (
      <View style={{ ...styles.container, ...this.props.style }} {...this.props}>
        <Text style={{
          ...styles.countIcon,
          ...this.props.fontStyle
        }}>
          {this.props.count || 0}
        </Text>
        {child}
      </View>
    )
  }
}

CountIcon.propTypes = {
  count: PropTypes.number,
  fontStyle: Text.propTypes.style,
  size: PropTypes.number,
  style: PropTypes.any
}

const styles = StyleSheet.create({
  countIcon: {
    fontWeight: 'bold',
    paddingRight: 2
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
