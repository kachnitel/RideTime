import React from 'react'
import { StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import RideTimeIcon from '../icons/RideTimeIcon'
import CountIcon from '../icons/CountIcon'

export default class RiderCount extends React.Component {
  render () {
    return (
      <CountIcon
        {...this.props}
        fontStyle={{ ...styles.fontStyle, ...this.props.fontStyle }}
      >
        <RideTimeIcon
          icon='person'
          size={this.props.size}
          style={styles.countIcon}
        />
      </CountIcon>
    )
  }
}

RiderCount.propTypes = {
  count: PropTypes.number,
  fontStyle: Text.propTypes.style,
  size: PropTypes.number,
  style: PropTypes.any
}

RiderCount.defaultProps = {
  size: 20
}

const styles = StyleSheet.create({
  countIcon: {
    fontWeight: 'bold',
    paddingRight: 2,
    color: '#878787' // should be #656565 for black, 878787 white background (from parent)
  },
  fontStyle: {
    color: '#878787'
  }
})
