import React from 'react';
import Profile from '../components/profile/Profile';

// TODO OwnProfileScreen, title just Profile or My Profile
// w/ little name under in sidebar eventually 
export default class PublicProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile: ' + navigation.getParam('name', 'NAMELESS RIDER')
    };
  };

  render() {
    return (
      <Profile user={this.props.navigation.state.params} />
    );
  }
}
