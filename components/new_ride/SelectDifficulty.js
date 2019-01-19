import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import DifficultyIcon from '../icons/DifficultyIcon'
import OutlineIcon from '../icons/OutlineIcon'
import Layout from '../../constants/Layout'

/**
 * TODO:
 * - prop localDifficulties could allow greying out difficulties not in area
 *
 * @export
 * @class SelectDifficulty
 * @extends {Component}
 */
export default class SelectDifficulty extends Component {
  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        {Object.keys(DifficultyIcon.icons).map(Number).map((i) =>
          <View style={styles.iconContainer} key={i}>
            <OutlineIcon outlineStyle={styles.outlineStyle}>
              <DifficultyIcon d={i} size={Layout.window.wp(10)} />
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
    flexDirection: 'row'
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
