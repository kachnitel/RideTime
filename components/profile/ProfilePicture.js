import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default class ProfilePicture extends React.Component {
  render () {
    let size = this.props.size || 50

    return (
      <Image
        source={{ uri: this.props.picture }}
        style={{
          ...styles.image,
          width: size,
          height: size,
          borderRadius: size / 2,
          ...this.props.style
        }}
      />
    )
  }
}

ProfilePicture.propTypes = {
  picture: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.any
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'rgba(12, 94, 20, 0.5);'
  }
})
