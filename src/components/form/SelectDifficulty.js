import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../../constants/Layout'
import SelectWithIcon from './SelectWithIcon'
import OutlineIcon from '../icons/OutlineIcon'

export default class SelectDifficulty extends React.Component {
  render () {
    let options = Object.keys(DifficultyIcon.icons).map(Number).map((value) => {
      return ({
        value: value,
        ...DifficultyIcon.icons[value]
      })
    }).filter((level) => this.props.max === undefined
      ? true
      : level.value <= this.props.max)

    let value = this.props.value != null
      ? {
        ...DifficultyIcon.icons[this.props.value],
        value: this.props.value
      }
      : undefined

    return (
      <SelectWithIcon
        {...this.props}
        value={value}
        options={options}
        placeholder={this.props.placeholder || 'What\'s your riding experience?'}
        headerText={this.props.headerText || 'Select trail difficulty'}
        footerText={this.props.footerText || 'Choose difficulty you\'re generally comfortable riding. It will be displayed on your profile.'}
        title={this.props.title || 'Riding experience'}
        icon={(value) =>
          <OutlineIcon outlineStyle={styles.iconOutline}>
            <DifficultyIcon d={value} size={Layout.window.hp(6)} />
          </OutlineIcon>
        }
      />
    )
  }
}

SelectDifficulty.propTypes = {
  ...SelectWithIcon.propTypes,
  max: PropTypes.oneOf(Object.keys(DifficultyIcon.icons).map(Number)),
  onValueChange: PropTypes.func,
  value: PropTypes.oneOf(Object.keys(DifficultyIcon.icons).map(Number))
}

const styles = StyleSheet.create({
  iconOutline: {
    color: '#fff'
  }
})