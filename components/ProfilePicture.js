import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default class ProfilePicture extends React.Component {
  loadImageAsync(riderId) {

  }

  render() {
    riderId =  this.props.rider.id;
    imgPath = 'https://s3.ca-central-1.amazonaws.com/ride-time/profile-images/' + riderId + '.png';

    return (
      <Image 
        source={{uri: imgPath}}
        style={styles.image}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(12, 94, 20, 0.5);'
  }
});
