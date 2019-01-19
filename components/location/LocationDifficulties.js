import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import DifficultyIcon from '../icons/DifficultyIcon'

export default class LocationDifficulties extends React.Component {
  createDifficultyIcons (props) {
    return props.difficulties.map(function (difficulty, key) {
      return <DifficultyIcon d={difficulty} size={30} key={key} /> // TODO why do I supply the key here?
    })
  }

  render () {
    let difficulties = this.createDifficultyIcons(this.props)

    return (
      <View style={styles.container}>
        {difficulties}
      </View>
    )
  }
}

LocationDifficulties.propTypes = {
  difficulties: PropTypes.arrayOf(PropTypes.number)
}

LocationDifficulties.defaultProps = {
  difficulties: []
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})
