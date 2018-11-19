import React from 'react';
import Profile from '../components/Profile';

export default class PublicProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'NAMELESS RIDER')
    };
  };

  render() {
    // console.log(this.props.navigation.state.params);
    return (
      <Profile user={this.props.navigation.state.params} />
    );
  }
}
