import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class RideItemDetail extends React.Component {
  render() {
    return <View style={styles.detail}>
      <View style={{flex: 65}}>
        <Text>Difficulty, Pace, ...</Text>
      </View>
      <View style={{flex: 35}}>
        <Text>12:30</Text>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
    detail: {
      flex: 1,
      flexDirection: 'row'
    }
})