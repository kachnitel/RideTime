import React, { Component } from 'react'
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native'
import DifficultyIcon from '../icons/DifficultyIcon'
import OutlineIcon from '../icons/OutlineIcon'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

/**
 * TODO:
 * - prop localDifficulties could allow greying out difficulties not in area
 *
 * @export
 * @class SelectDifficulty
 * @extends {Component}
 */
export default class SelectDifficulty extends Component {
  setDifficulty (d) {
    this.props.onSelect(d)
  }

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        {Object.keys(DifficultyIcon.icons).map(Number).map((d) => {
          let isSelected = d === this.props.selected

          return <TouchableNativeFeedback
            style={styles.iconContainer}
            key={d}
            onPress={() => this.setDifficulty(d)}
          >
            <OutlineIcon
              outlineStyle={isSelected ? styles.selectedOutlineStyle : styles.outlineStyle}
              thickness={isSelected ? 1.1 : 1.075} // FIXME: style doesn't change w/o this
            >
              <DifficultyIcon d={d} size={Layout.window.wp(10)} />
            </OutlineIcon>
          </TouchableNativeFeedback>
        })}
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
  },
  selectedOutlineStyle: {
    color: Colors.iconColor,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: Layout.window.hp(1),
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
  }
})
