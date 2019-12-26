import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'

export default class MenuModalOption extends Component {
  render () {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
      >
        <View style={{ ...styles.container, ...this.props.style }}>
          {this.props.icon && <Icon
            name={this.props.icon}
            size={Layout.window.hp(4)}
            style={styles.icon}
          />}
          <View style={styles.textContainer}>
            <Text style={styles.label}>{this.props.label}</Text>
            {this.props.description && <Text style={styles.description} numberOfLines={1}>{this.props.description}</Text>}
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

MenuModalOption.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.any
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.window.hp(3),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    opacity: 0.5,
    color: Colors.tintColor
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description: {
    opacity: 0.6,
    textAlign: 'center'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center'
  }
})
