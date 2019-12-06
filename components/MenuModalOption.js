import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
// import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default class MenuModalOption extends Component {
  render () {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
      >
        <View style={{ ...styles.optionContainer, ...this.props.style }}>
          <Text>{this.props.label}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

MenuModalOption.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.any
}

const styles = StyleSheet.create({
  optionContainer: {
    borderBottomColor: Colors.darkBackground,
    borderBottomWidth: 1,
    paddingVertical: Layout.window.hp(3),
    width: '100%',
    alignItems: 'center'
  }
})
