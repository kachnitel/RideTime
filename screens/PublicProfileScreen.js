import React from 'react';
import Profile from '../components/Profile';

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
