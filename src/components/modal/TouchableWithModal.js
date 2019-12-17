import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Provider } from 'mobx-react/native'
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
          <TouchableOpacity
            onPress={() => this.showModal()}
          >
            {this.props.children}
          </TouchableOpacity>
        </View>
        <ModalView
          isVisible={this.state.modalVisible}
          onBackButtonPress={this.hideModal}
          onBackdropPress={this.hideModal}
          style={this.props.modalStyle}
        >
          <Provider HideModal={this.hideModal}>
            {this.props.modalContent}
          </Provider>
        </ModalView>
      </View>
    )
  }
}

TouchableWithModal.propTypes = {
  children: PropTypes.any,
  containerStyle: PropTypes.any,
  modalStyle: PropTypes.any,
  modalContent: PropTypes.any
}
