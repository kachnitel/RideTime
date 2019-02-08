import React, { Component } from 'react'
import { View, StyleSheet, TouchableNativeFeedback, Text } from 'react-native'
import TerrainIcon from '../icons/TerrainIcon'
import Layout from '../../constants/Layout'
import Title from './Title'

/**
 * @export
 * @class SelectTerrain
 * @extends {Component}
 */
export default class SelectTerrain extends Component {
  setTerrain (d) {
    this.props.onSelect(d)
  }

  render () {
    return (
      <View {...this.props}>
        <Title>{this.props.title}</Title>
        <View style={styles.iconsContainer}>
          {Object.keys(TerrainIcon.icons).map((t) => {
            let isSelected = t === this.props.selected

            return <TouchableNativeFeedback
              key={t}
              onPress={() => this.setTerrain(t)}
            >
              <View style={isSelected ? { ...styles.iconContainer, ...styles.selectedIconContainer } : styles.iconContainer}>
                <TerrainIcon terrain={t} size={Layout.window.wp(10)} />
                <Text style={styles.terrainName}>{TerrainIcon.icons[t].name}</Text>
              </View>
            </TouchableNativeFeedback>
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iconsContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    flex: 1,
    padding: Layout.window.wp(1),
    alignItems: 'center',
    marginHorizontal: Layout.window.wp(5)
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: Layout.window.hp(1),
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
  },
  terrainName: {
    color: '#fff'
  }
})
