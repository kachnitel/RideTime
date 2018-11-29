import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CoverPicture from './CoverPicture';
import Dimensions from '../constants/Layout'

export default class Profile extends React.Component {
  render() {
    // console.log(this.props.user.name);
    return(
      <View style={{flex: 1}}>
        <CoverPicture 
          user={this.props.user} 
          width={Dimensions.window.width} 
          height={215/350*Dimensions.window.width} 
          style={styles.coverPicture}
        />
        <Text>{this.props.user.name}</Text>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  coverPicture: {
    // position: 'absolute'
  }
});
