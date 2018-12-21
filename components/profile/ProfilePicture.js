import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default class ProfilePicture extends React.Component {
  render() {
    riderId =  this.props.rider.id;
    imgPath = 'https://s3.ca-central-1.amazonaws.com/ride-time/profile-images/' + riderId + '.png';

    size = this.props.size || 50;

    return (
      <Image
        source={{uri: imgPath}}
        style={{ // FIXME https://github.com/kachnitel/RideTime/commit/f4caf5f95245d182ec86d21bd5faf721197d3ef5#diff-61a4930816190520f9babe8250ecacd8
            ...styles.image,
            width: size,
            height: size,
            borderRadius: size / 2
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'rgba(12, 94, 20, 0.5);'
  }
});
