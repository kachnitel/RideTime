import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'

export default class ButtonIcon extends Component {
  render () {
    let color = this.props.color || Colors.tintColor

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ ...styles.container, ...this.props.style }}>
          {this.props.iconComponent || <Icon
            name={this.props.icon || 'adb'}
            color={color}
            size={Layout.window.hp(3)}
          />}
          {this.props.text && <Text style={{ ...styles.text, color: color }}>{this.props.text}</Text>}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Layout.window.hp(1),
    borderRadius: Layout.window.hp(1),
    flexDirection: 'row'
  },
  text: {
    fontSize: Layout.window.hp(2.5),
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: Layout.window.hp(1)
  }
})
