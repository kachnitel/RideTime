import React, { Component } from 'react'
import { TouchableHighlight, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import RiderItem from './RiderItem'
import { inject, observer } from 'mobx-react/native'

@inject('User')
@observer
class TouchableRiderItem extends Component {
  render () {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.push(
        this.props.route || 'PublicProfile',
        this.props.User
      )}>
        <View>
          <RiderItem />
        </View>
      </TouchableHighlight>
    )
  }
}

export default withNavigation(TouchableRiderItem)
