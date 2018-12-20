import React from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Layout from "../constants/Layout";

export class CreateRideButton extends React.Component {
  navigateToCreateRide = () => {
    this.props.navigation.push('CreateRide')
  }

  render() {
    return <ActionButton
      buttonColor="rgba(134, 194, 50, 1)"
      size={Layout.window.wp(18)}
      buttonTextStyle={styles.actionButtonIcon}
      onPress={() => { this.navigateToCreateRide() }}
    />;
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: Layout.window.wp(12)
  }
});
