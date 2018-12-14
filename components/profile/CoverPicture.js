import React from 'react';
import { Image } from 'react-native';

export default class CoverPicture extends React.Component {
  render() {
    riderId =  this.props.user.id;
    imgPath = 'https://s3.ca-central-1.amazonaws.com/ride-time/cover-images/' + riderId + '.png';

    return (
      <Image
        source={{uri: imgPath}}
        {...this.props}
      />
    );
  }
}
