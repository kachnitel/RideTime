import React from 'react'
import SvgPersonIcon from './PersonIcon'
import PropTypes from 'prop-types'

export default class RideTimeIcon extends React.Component {
  icons = {
    person: SvgPersonIcon
  }

  _getIconProps () {
    let size = this.props.size
    // current Icons are based on 600px viewBox

    return ({
      viewBox: '0 0 600 600',
      width: size,
      height: size,
      ...this.props
    })
  }

  render () {
    if (this.icons[this.props.icon] === undefined) {
      throw new Error('Icon "' + this.props.icon + '" is not defined')
    }
    let Icon = this.icons[this.props.icon]

    return (
      <Icon
        {...this._getIconProps()}
        style={this.props.style}
      />
    )
  }
}

RideTimeIcon.propTypes = {
  icon: PropTypes.any,
  size: PropTypes.number.isRequired,
  style: PropTypes.any
}
