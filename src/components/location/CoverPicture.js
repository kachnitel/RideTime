import PropTypes from 'prop-types'
import React from 'react'
import { Image, View } from 'react-native'

const CoverPicture = (props) => (
  props.id
    ? <Image // TODO: Better link! pNpb where N seems to stand for size
      source={{ uri: `https://ep1.pinkbike.org/p2pb${props.id}/p2pb${props.id}.jpg` }}
      {...props}
    />
    : <View {...props} />
)

CoverPicture.propTypes = {
  // ...Image.propTypes
  id: PropTypes.number
}

export default CoverPicture
