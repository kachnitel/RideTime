import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import sharedStyles from './Style';
import Title from './Title';
import TerrainIcon from '../icons/TerrainIcon'

export default class PreferredStyle extends Component {
  render() {
    return(
      <View style={styles.summaryItem}>
        <Title style={styles.title}>Style</Title>
        <View style={styles.content}>
          <TerrainIcon terrain={this.props.terrain} size={24} /> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ...sharedStyles
});
