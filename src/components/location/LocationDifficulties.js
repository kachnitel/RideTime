import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../../constants/Layout'
import CountBadge from '../CountBadge'
import Colors from '../../../constants/Colors'

export default class LocationDifficulties extends React.Component {
  createDifficultyIcons (props) {
    return Object.entries(props.difficulties).map(function ([difficulty, trailCount]) {
      if (trailCount > 0) {
        return <View key={difficulty}>
          <DifficultyIcon d={Number(difficulty)} size={props.iconSize} />
          <CountBadge
            count={trailCount}
            style={{
              ...styles.trailCountBadge,
              fontSize: props.iconSize / 3,
              minWidth: props.iconSize / 3
            }}
          />
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
  trailCountBadge: {
    position: 'absolute',
    right: 0,
    fontSize: Layout.window.hp(1.5),
    minWidth: Layout.window.hp(2),
    backgroundColor: Colors.listHeaderBackground
  }
})
