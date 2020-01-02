import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ModalView from './ModalView'
import MenuModalOption from './MenuModalOption'

export default class ModalViewMenu extends Component {
  render () {
    return (
      <ModalView {...this.props}>
        {this.props.options.map((option, index) => <MenuModalOption
          key={'opt_' + index}
          {...option}
        />)}
      </ModalView>
    )
  }
}

ModalViewMenu.propTypes = {
  ...ModalView.propTypes,
  options: PropTypes.arrayOf(PropTypes.shape({
    ...MenuModalOption.propTypes
  }))
}
