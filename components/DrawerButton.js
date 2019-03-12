import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../constants/Colors'

export default class DrawerButton extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
        <View style={styles.headerMenuIconContainer}>
          <Icon style={styles.headerMenuIcon} name='menu' />
        </View>
      </TouchableOpacity>
    )
  };
}

const styles = StyleSheet.create(
  {
    headerMenuIconContainer: {
      justifyContent: 'center'
    },
    headerMenuIcon: {
      fontSize: 32,
      padding: 15,
      color: Colors.tintColor
    }
  }
)
