import PropTypes from 'prop-types'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../constants/Layout'

export default class LocationDifficulties extends React.Component {
  createDifficultyIcons (props) {
    return Object.entries(props.difficulties).map(function ([difficulty, trailCount]) {
      if (trailCount > 0) {
        return <View key={difficulty}>
          <DifficultyIcon d={Number(difficulty)} size={props.iconSize} />
          <Text style={styles.trailCount}>{trailCount}</Text>
        </View>
      }
    })
  }

  render () {
    let difficulties = this.createDifficultyIcons(this.props)

    return (
      <View {...this.props}>
        {difficulties}
      </View>
    )
  }
}

LocationDifficulties.propTypes = {
  difficulties: PropTypes.object,
  iconSize: PropTypes.number
}

LocationDifficulties.defaultProps = {
  difficulties: [],
  iconSize: 30
}

const styles = StyleSheet.create({
  trailCount: {
    fontSize: Layout.window.hp(1.75),
    alignSelf: 'center',
    backgroundColor: '#fffa',
    borderRadius: Layout.window.hp(1),
    padding: 0,
    paddingHorizontal: Layout.window.wp(1)
  }
})
