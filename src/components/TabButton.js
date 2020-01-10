import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import CountBadge from './CountBadge'

export default class TabButton extends Component {
  renderIcon = () => this.props.icon && <MaterialIcons
    name={this.props.icon}
    color={this.props.active ? styles.tabToggleActive.color : styles.tabToggle.color}
    size={Layout.window.hp(3)}
  />

  render () {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.active}
      >
        <View
          style={{
            ...this.props.active
              ? { ...styles.container, ...styles.containerActive }
              : styles.container,
            ...this.props.style
          }}
        >
          {this.renderIcon()}
          <Text
            style={
              this.props.active
                ? { ...styles.tabToggle, ...styles.tabToggleActive }
                : styles.tabToggle
            }
            numberOfLines={1}
          >
            {this.props.title}
          </Text>
          {this.props.badge > 0 && <CountBadge
            count={this.props.badge}
            style={styles.badge}
          />}
        </View>
      </TouchableOpacity>
    )
  }
}

TabButton.propTypes = {
  active: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.any,
  title: PropTypes.string,
  badge: PropTypes.number,
  icon: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: '#ccc',
    borderRightColor: '#ddd',
    flex: 1
  },
  containerActive: {
    backgroundColor: '#ccc3'
  },
  tabToggle: {
    color: '#888'
  },
  tabToggleActive: {
    color: Colors.tintColor
  },
  badge: {
    position: 'absolute',
    right: Layout.window.wp(1),
    top: Layout.window.hp(1)
  }
})
