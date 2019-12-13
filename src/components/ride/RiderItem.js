import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import Layout from '../../../constants/Layout'
import ProfilePicture from '../profile/ProfilePicture'

export default
@inject('User', 'TextColor')
@observer
class RiderItem extends React.Component {
  render () {
    let textStyle = this.props.TextColor
      ? { ...styles.name, color: this.props.TextColor }
      : styles.name
    return (
      <View style={styles.listItem}>
        <ProfilePicture picture={this.props.User.picture} size={Layout.window.hp(7)} />
        <Text style={textStyle} numberOfLines={1} >
          {this.props.User.name}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: Layout.window.hp(11),
    height: Layout.window.hp(12.5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Layout.window.hp(2)
  },
  name: {
    textAlign: 'center',
    paddingTop: Layout.window.hp(1),
    flex: 1
  }
})
