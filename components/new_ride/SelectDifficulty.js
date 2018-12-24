import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import DifficultyIcon from '../icons/DifficultyIcon';
import OutlineIcon from '../icons/OutlineIcon';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export default class SelectDifficulty extends Component {
  render() {
    return(
      <View style={styles.container}>
        {Object.keys(DifficultyIcon.icons).map((i) => //difficulties should be pulled from DifficultIcon TODO
          <View style={styles.iconContainer} key={i}>
            <OutlineIcon outlineStyle={styles.outlineStyle}>
              <DifficultyIcon d={i} size={Layout.window.wp(10)}/>
            </OutlineIcon>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: Layout.window.wp(20),
    backgroundColor: Colors.darkBackground
  },
  iconContainer: {
    flex: 1,
    padding: Layout.window.wp(1),
    alignItems: 'center'
  },
  outlineStyle: {
    color: '#fff'
  }
})
