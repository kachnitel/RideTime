import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { MaterialIcons } from '@expo/vector-icons'

export default class CountIcon extends React.Component {
  render () {
    return (
      <View style={{ ...styles.container, ...this.props.style }} {...this.props}>
        <Text style={{
          ...styles.count,
          color: this.props.color,
          fontSize: this.props.size * 0.6
        }}>
          {this.props.count || 0}
        </Text>
        <MaterialIcons
          name={this.props.name}
          size={this.props.size}
          style={{ color: this.props.color }}
        />
      </View>
    )
  }
}

CountIcon.propTypes = {
  count: PropTypes.number,
  size: PropTypes.number.isRequired,
  style: PropTypes.any,
  name: PropTypes.oneOf(Object.keys(MaterialIcons.glyphMap))
}

const styles = StyleSheet.create({
  count: {
    fontWeight: 'bold'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
