import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../constants/Layout'
import Modal from 'react-native-modal'

export default class ModalView extends Component {
  render () {
    return (
      <Modal {...this.props}>
        <View style={{ ...styles.container, ...this.props.containerStyle }}>
          {this.props.children}
        </View>
      </Modal>
    )
  }
}

ModalView.propTypes = {
  ...Modal.propTypes,
  children: PropTypes.any,
  containerStyle: PropTypes.any
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: Layout.window.hp(2),
    alignItems: 'center',
    paddingVertical: Layout.window.hp(2)
  }
})
