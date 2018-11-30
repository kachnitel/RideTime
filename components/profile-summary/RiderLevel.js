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
          <DifficultyIcon d={this.props.level} size={24} style={{color: Colors.darkBackground}} /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...sharedStyles
});
