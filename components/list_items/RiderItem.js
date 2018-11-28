import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import ProfilePicture from '../ProfilePicture';

class RiderItem extends React.Component {
  render() {
    return (
      // Rider should contain his details fetched in list
      // To render eg. little exp. icon in corner of image
      <TouchableHighlight onPress={() => this.props.navigation.navigate('PublicProfile', this.props.rider)}>
        <View style={styles.listItem}>
          <ProfilePicture rider={this.props.rider} size={65} />
          <Text style={styles.name}>
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
    marginTop: 15
  },
  name: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 5
  }
});
