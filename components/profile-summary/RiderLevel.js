import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DifficultyIcon from '../icons/DifficultyIcon';
import sharedStyles from './Style';
import Title from './Title';
import Colors from '../../constants/Colors';

export default class RiderLevel extends Component {
  render() {
    return(
      <View style={styles.summaryItem}>
        <Title style={styles.title}>Level</Title>
        <View style={styles.content}>
          <DifficultyIcon d={this.props.level} size={28} style={{...styles.icon, ...styles.iconBg}} />
          <DifficultyIcon d={this.props.level} size={24} style={styles.icon} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...sharedStyles,
  icon: {
    color: Colors.darkBackground,
    position: 'absolute',
    alignSelf: "center",
    justifyContent: 'center'
  },
  iconBg: {
    color: Colors.iconColor
  }
});
