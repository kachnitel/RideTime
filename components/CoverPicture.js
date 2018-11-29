import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default class CoverPicture extends React.Component {
  render() {
    riderId =  this.props.user.id;
    imgPath = 'https://s3.ca-central-1.amazonaws.com/ride-time/cover-images/' + riderId + '.png';

    return (
      <Image 
        source={{uri: imgPath}}
        style={{
            width: this.props.width,
            height: this.props.height,
            ...this.props.style
        }}
      />
    );
  }
}
