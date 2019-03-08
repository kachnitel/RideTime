import React from 'react'
import { Image } from 'react-native'

export default class CoverPicture extends React.Component {
  render () {
    // let riderId = this.props.user.id
    let riderId = 1 // TODO:
    // FIXME const in a config file should contain the URL
    let imgPath = 'https://s3.ca-central-1.amazonaws.com/ride-time/cover-images/' + riderId + '.png'

    return (
      <Image
        source={{ uri: imgPath }}
        {...this.props}
      />
    )
  }
}
