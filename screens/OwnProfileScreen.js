import React from 'react';
import Profile from '../components/profile/Profile';
import { Text, View } from 'react-native';
import RidersProvider from '../providers/RidersProvider';

export default class OwnProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // w/ little name under in drawer eventually
      title: 'My Profile',
      headerRight: (
        <Text>Edit</Text>
      )
    };
  };

  render() {
    user = RidersProvider.getUser(1);
    return (
      <Profile user={user} />
    );
  }
}
