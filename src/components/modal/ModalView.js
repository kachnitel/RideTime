import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Layout from '../../../constants/Layout'
import MenuModalOption from './MenuModalOption'
import Colors from '../../../constants/Colors'

export default class ModalView extends Component {
  render () {
    return (
      <Modal {...this.props}>
        <View style={{ ...styles.container, ...this.props.containerStyle }}>
          {this.props.children}
          {this.props.onClose && <MenuModalOption
            onPress={this.props.onClose}
            label={'Close'}
            icon='exit-to-app'
            description='Close this menu'
            style={styles.closeItem}
          />}
        </View>
      </Modal>
    )
  }
}

ModalView.propTypes = {
  ...Modal.propTypes,
  onClose: PropTypes.func,
  children: PropTypes.any,
  containerStyle: PropTypes.any
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBackground,
    borderRadius: Layout.window.hp(2),
    alignItems: 'center',
    paddingVertical: Layout.window.hp(2)
  },
  closeItem: {
    opacity: 0.5
  }
})
