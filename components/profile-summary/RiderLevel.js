import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DifficultyIcon from '../icons/DifficultyIcon';
import sharedStyles from './Style';
import Title from './Title';
import Colors from '../../constants/Colors';

/**
 * TODO: Need to discuss design options
 * - iconBg size 28, icon on top
 * - iconBg size 24 ONLY
 * - iconBg size 28, icon on top in "real" color
 */
export default class RiderLevel extends Component {
  render() {
    return(
      this.props.level !== undefined ?
        <View style={styles.summaryItem}>
          <Title style={styles.title}>Level</Title>
          <View style={styles.content}>
            <DifficultyIcon d={this.props.level} size={26} style={{...styles.icon, ...styles.iconBg}} />
            <DifficultyIcon d={this.props.level} size={21} style={styles.icon} />
          </View>
        </View>
      : null
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
