import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Alert
} from 'react-native'
import Modal from 'react-native-modal'
import { inject, observer } from 'mobx-react/native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

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
      <Modal
        isVisible={this.props.visible}
        onBackdropPress={this.props.hide}
        onBackButtonPress={this.props.hide}
      >
        <View style={styles.container}>
          <TouchableNativeFeedback onPress={this.handleRemoveFriend}>
            <View style={styles.optionContainer}>
              <Text>Remove friend</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={this.props.hide}>
            <View style={styles.optionContainer}>
              <Text>Close</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Modal>
    )
  }
}

FriendMenuModal.propTypes = {
  hide: PropTypes.func,
  userId: PropTypes.number,
  visible: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: Layout.window.hp(2),
    alignItems: 'center'
  },
  optionContainer: {
    borderBottomColor: Colors.darkBackground,
    borderBottomWidth: 1,
    paddingVertical: Layout.window.hp(3),
    width: '100%',
    alignItems: 'center'
  }
})
