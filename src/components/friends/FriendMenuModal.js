import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import MenuModalOption from '../modal/MenuModalOption'
import ModalView from '../modal/ModalView'

export default
@inject('UserStore')
@observer
class FriendMenuModal extends Component {
  handleRemoveFriend = () => {
    Alert.alert(
      'Are you sure?',
      `Remove ${this.props.UserStore.getSync(this.props.userId).name} from friends?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: this.removeFriend
        }
      ]
    )
  }

  removeFriend = () => {
    this.props.UserStore.removeFriend(this.props.userId)
    this.props.hide()
  }

  render () {
    return (
      <ModalView
        isVisible={this.props.visible}
        onBackdropPress={this.props.hide}
        onBackButtonPress={this.props.hide}
        onClose={this.props.hide}
      >
        <MenuModalOption
          onPress={this.handleRemoveFriend}
          label='Remove friend'
          icon='remove-circle-outline'
        />
      </ModalView>
    )
  }
}

FriendMenuModal.propTypes = {
  hide: PropTypes.func,
  userId: PropTypes.number,
  visible: PropTypes.bool
}
