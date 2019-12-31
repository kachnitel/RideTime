import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import CountBadge from '../CountBadge'

export default class MenuModalOption extends Component {
  render () {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
      >
        <View style={{ ...styles.container, ...this.props.style }}>
          <View>
            {this.props.icon && <Icon
              name={this.props.icon}
              size={Layout.window.hp(4)}
              style={this.props.highlight
                ? { ...styles.icon, ...styles.highlightIcon }
                : styles.icon}
            />}
            {this.props.badge > 0 && <CountBadge
              count={this.props.badge}
              style={styles.badge}
            />}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>{this.props.label}</Text>
            {this.props.description && <Text style={styles.description}>{this.props.description}</Text>}
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

MenuModalOption.propTypes = {
  badge: PropTypes.number,
  description: PropTypes.string,
  highlight: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
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
    color: Colors.tintColor,
    opacity: 0.66
  },
  highlightIcon: {
    opacity: 1,
    color: Colors.confirmationHighlight
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
  },
  badge: {
    position: 'absolute',
    right: -Layout.window.hp(1),
    top: -Layout.window.hp(1)
  }
})
