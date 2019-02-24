import React from 'react'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../constants/Layout'
import SelectWithIcon from '../form/SelectWithIcon'

export default class SelectDifficulty extends React.Component {
  render () {
    const options = Object.keys(DifficultyIcon.icons).map((value, index) => {
      return ({
        value: index,
        ...DifficultyIcon.icons[index]
      })
    }).filter((level) => this.props.max === undefined ? true : level.value <= this.props.max)

    return (
      <SelectWithIcon
        options={options}
        placeholder={'What\'s your riding experience?'}
        headerText='Select trail difficulty'
        footerText={'Choose difficulty you\'re generally comfortable riding. It will be displayed on yor profile.'}
        onValueChange={this.props.onValueChange}
        icon={(value) => <DifficultyIcon d={value} size={Layout.window.hp(6)} />}
      />
    )
  }
}
