import React from 'react';
import Profile from '../components/profile/Profile';
import { Text, View } from 'react-native';

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
    user = {
      id: 4,
      name: "Hardcoded user"
    }
    return (
      <Profile user={user} />
    );
  }
}
