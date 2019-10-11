import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, TouchableNativeFeedback } from 'react-native'
import ModalView from './ModalView'

/**
 * Uses "children" to render a component that displays
 * a ModalView which contains "props.modalContent"
 *
 * @export
 * @class TouchableWithModal
 * @extends {Component}
 */
export default class TouchableWithModal extends Component {
  state = {
    modalVisible: false
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  render () {
    return (
      <View>
        <View style={this.props.containerStyle}>
          <TouchableNativeFeedback
            onPress={() => this.showModal()}
          >
            {this.props.children}
          </TouchableNativeFeedback>
        </View>
        <ModalView
          isVisible={this.state.modalVisible}
          onBackButtonPress={this.hideModal}
          onBackdropPress={this.hideModal}
        >
          {this.props.modalContent}
        </ModalView>
      </View>
    )
  }
}

TouchableWithModal.propTypes = {
  children: PropTypes.any,
  containerStyle: PropTypes.any,
  modalContent: PropTypes.any
}
