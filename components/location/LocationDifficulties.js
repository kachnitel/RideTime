import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import DifficultyIcon from '../icons/DifficultyIcon'

export default class LocationDifficulties extends React.Component {
  createDifficultyIcons (props) {
    return props.difficulties.map(function (difficulty, key) {
      return <DifficultyIcon d={difficulty} size={props.iconSize} key={key} /> // TODO why do I supply the key here?
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
  difficulties: PropTypes.arrayOf(PropTypes.number),
  iconSize: PropTypes.number
}

LocationDifficulties.defaultProps = {
  difficulties: [],
  iconSize: 30
}
