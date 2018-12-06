import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProfileHeader from './ProfileHeader';
import { FriendList } from './FriendList';

export default class Profile extends React.Component {
  render() {
    return(
      <View>
        <ProfileHeader user={this.props.user} />
        <FriendList userIds={[1,2,3]} style={styles.friendList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  friendList: {
    paddingTop: 10,
    color: '#000'
  }
})
