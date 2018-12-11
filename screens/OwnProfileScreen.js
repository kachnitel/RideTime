import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Profile from '../components/profile/Profile';
import RidersProvider from '../providers/RidersProvider';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

export default class OwnProfileScreen extends React.Component {
  static editProfile() {
    alert('Let\'s edit this ma');
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // w/ little name under in drawer eventually
      title: 'My Profile',
      headerRight: (
        <View style={styles.button}>
        <Button
          title='Edit'
          onPress={OwnProfileScreen.editProfile}
          color={Colors.tintColor}
        />
        </View>
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

const styles = StyleSheet.create({
  button: {
    paddingRight: Layout.window.wp(2),
  }
});
