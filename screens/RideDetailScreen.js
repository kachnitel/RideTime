import React from 'react';
import { RideDetail } from '../components/RideDetail';

export default class RideDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'NO NAME RIDE')
    };
  };

  render() {
    // console.log(this.props.navigation.state.params);
    return (
      // (w/ map above maybe)
      // Not sure if I like using state.params rather than getParam
      // but getParam can't get me the whole 'ride' object, 
      // if I pass the object wrapped then I can't get it for nav.title
      <RideDetail ride={this.props.navigation.state.params}/>
    );
  }
}
