import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import ProfilePicture from '../profile/ProfilePicture';
import Layout from '../../constants/Layout';

class RiderItem extends React.Component {
  render() {
    // console.log(this.props.rider)
    return (
      // Rider should contain his details fetched in list
      // To render eg. little exp. icon in corner of image
      <TouchableHighlight onPress={() => this.props.navigation.navigate({
        key: Math.random () * 10000,
        routeName: 'PublicProfile',
        params: this.props.rider
      })}>
        <View style={styles.listItem}>
          <ProfilePicture rider={this.props.rider} size={Layout.window.hp(7)} />
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
    width: Layout.window.hp(11),
    height: Layout.window.hp(12.5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Layout.window.hp(2)
  },
  name: {
    textAlign: 'center',
    paddingTop: Layout.window.hp(1),
    flex: 1,
  }
});
