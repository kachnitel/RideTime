import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'

export default class ProfilePicture extends React.Component {
  state = {
    size: null
  }

  componentDidMount = () => {
    this.updateSize()
  }

  updateSize = (width: ?Number = false) => {
    this.setState({ size: width ?? this.props.size })
  }

  render () {
    return (
      <Image
        source={{ uri: this.props.picture }}
        style={{
          ...styles.image,
          width: this.props.size ?? '100%',
          aspectRatio: 1,
          borderRadius: this.state.size / 2,
          ...this.props.style
        }}
        onLayout={(event) => {
          let width = event.nativeEvent.layout.width
          this.updateSize(width)
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
    backgroundColor: Colors.darkBackgroundTransparent
  }
})
