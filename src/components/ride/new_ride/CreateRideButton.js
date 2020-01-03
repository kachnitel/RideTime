import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../../constants/Colors'

export class CreateRideButton extends React.Component {
  navigateToNewRide = () => {
    this.props.navigation.push('NewRide')
  }

  render () {
    let size = this.props.size
    let dimensions = {
      fontSize: size * 0.6,
      padding: size * 0.2,
      borderRadius: size / 2
    }
    return <View style={{ ...styles.actionButtonIcon, ...this.props.style }}>
      <TouchableOpacity onPress={this.navigateToNewRide}>
        <MaterialIcons
          name='add'
          style={{ ...styles.icon, ...dimensions }}
        />
      </TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    backgroundColor: Colors.iconColor,
    color: '#fff'
  }
})
