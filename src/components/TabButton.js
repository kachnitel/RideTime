import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'

export default class TabButton extends Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress} disabled={this.props.active}>
        <Text
          style={{
            ...this.props.active
              ? { ...styles.tabToggle, ...styles.tabToggleActive }
              : styles.tabToggle,
            ...this.props.style
          }}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

TabButton.propTypes = {
  active: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.any,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  tabToggle: {
    backgroundColor: Colors.tintColor,
    color: '#fff',
    padding: Layout.window.hp(2),
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1
  },
  tabToggleActive: {
    backgroundColor: '#fff',
    color: Colors.tintColor
  }
})
