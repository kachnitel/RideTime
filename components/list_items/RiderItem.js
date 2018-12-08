import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import ProfilePicture from '../profile/ProfilePicture';

class RiderItem extends React.Component {
  render() {
    // console.log(this.props.rider)
    return (
      // Rider should contain his details fetched in list
      // To render eg. little exp. icon in corner of image
      <TouchableHighlight onPress={() => this.props.navigation.navigate('PublicProfile', this.props.rider)}>
        <View style={styles.listItem}>
          <ProfilePicture rider={this.props.rider} size={65} />
          <Text style={{...styles.name, ...this.props.style}} numberOfLines={1} >
            {this.props.rider.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }  
}

export default withNavigation(RiderItem);

const styles = StyleSheet.create({
  listItem: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  name: {
    textAlign: 'center',
    paddingTop: 5,
    flex: 1
  }
});
