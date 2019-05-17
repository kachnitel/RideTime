import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native'
import Colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Layout from '../constants/Layout'

export default class ButtonIcon extends Component {
  render () {
    return (
      <TouchableOpacity
        {...this.props}
        style={{ ...styles.button, ...this.props.style }}
        onPress={this.props.onPress}
      >
        <View style={styles.innerContainer}>
          {this.props.iconComponent || <Icon
            name={this.props.icon || 'adb'}
            color={'#fff'}
            size={Layout.window.hp(4)}
          />}
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.tintColor,
    padding: Layout.window.hp(1),
    borderRadius: Layout.window.hp(1)
  },
  innerContainer: {
    flexDirection: 'row'
  },
  text: {
    color: '#fff',
    fontSize: Layout.window.hp(3)
  }
})
