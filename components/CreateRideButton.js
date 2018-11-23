import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

export class CreateRideButton extends React.Component {
  render() {
    return <ActionButton buttonColor="rgba(134, 194, 50, 1)" size={64} buttonTextStyle={{ fontSize: 40 }}>
      <ActionButton.Item buttonColor='#9b59b6' title="Road ride" onPress={() => console.log("notes tapped!")}>
        <Icon name="md-stopwatch" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#3498db' title="Shuttle" onPress={() => {}}>
        <Icon name="md-car" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#1abc9c' title="Pedal" onPress={() => {}}>
        <Icon name="md-bicycle" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>;
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 30,
    height: 30,
    color: 'white',
  },
});
