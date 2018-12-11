import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Profile from '../components/profile/Profile';
import RidersProvider from '../providers/RidersProvider';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableHighlight } from 'react-native';

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
      ),
      headerLeft: (
        <TouchableHighlight
          onPress={() => navigation.toggleDrawer()}>
          <View style={styles.headerMenuIconContainer}>
            <Icon style={styles.headerMenuIcon} name='menu' />
          </View>
        </TouchableHighlight>
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
  },
  headerMenuIconContainer: {
    justifyContent: 'center'
  },
  headerMenuIcon: {
    fontSize: 24,
    paddingLeft: 15,
    color: '#0C5E14'
  }
});
