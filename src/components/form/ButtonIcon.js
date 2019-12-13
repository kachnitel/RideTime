import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'

export default class ButtonIcon extends Component {
  render () {
    return (
      <TouchableOpacity
        {...this.props}
        style={{ ...styles.button, ...this.props.style }}
        onPress={this.props.onPress}
      >
        <View style={styles.innerContainer}>
          {this.props.iconComponent || <MaterialIcons
            name={this.props.icon || 'adb'}
            color={this.props.color || '#fff'}
            size={Layout.window.hp(3)}
          />}
          {this.props.text && <Text style={{ ...styles.text, color: this.props.color || '#fff' }}>{this.props.text.toUpperCase()}</Text>}
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
    fontSize: Layout.window.hp(2.5),
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: Layout.window.hp(0.5)
  }
})