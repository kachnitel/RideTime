import React from 'react'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../constants/Layout'
import SelectWithIcon from '../form/SelectWithIcon'
import OutlineIcon from '../icons/OutlineIcon'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class SelectDifficulty extends React.Component {
  render () {
    let options = Object.keys(DifficultyIcon.icons).map((value, index) => {
      return ({
        value: index,
        ...DifficultyIcon.icons[index]
      })
    }).filter((level) => this.props.max === undefined ? true : level.value <= this.props.max)

    let value = {
      ...DifficultyIcon.icons[this.props.value],
      value: this.props.value
    }

    return (
      <SelectWithIcon
        {...this.props}
        value={value}
        options={options}
        placeholder={'What\'s your riding experience?'}
        headerText='Select trail difficulty'
        footerText={'Choose difficulty you\'re generally comfortable riding. It will be displayed on yor profile.'}
        title='Riding experience'
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
  max: DifficultyIcon.propTypes.d,
  onValueChange: PropTypes.func
}

const styles = StyleSheet.create({
  iconOutline: {
    color: '#fff'
  }
})
