import React from 'react';
import Profile from '../components/profile/Profile';

// TODO OwnProfileScreen, title just Profile or My Profile
// w/ little name under in sidebar eventually
export default class PublicProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {backgroundColor: 'rgba(255,255,255,0.66);', width: 55, height: 50, borderBottomRightRadius: 5},
      headerTransparent: true
    };
  };

  render() {
    return (
      <Profile user={this.props.navigation.state.params} />
    );
  }
}
