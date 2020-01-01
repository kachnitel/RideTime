import React from 'react'
import PropTypes from 'prop-types'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../../constants/Layout'
import SelectWithIcon from './SelectWithIcon'

export default class SelectDifficulty extends React.Component {
  render () {
    let options = Object.keys(DifficultyIcon.icons)
      .map(Number)
      .filter((d) => d > 0)
      .map((difficulty: Number) => ({
        customIcon: <DifficultyIcon d={difficulty} size={Layout.window.hp(5)} />,
        label: DifficultyIcon.icons[difficulty].label,
        value: difficulty,
        icon: (this.props.value === difficulty) ? 'check' : undefined,
        highlight: this.props.value === difficulty
      }))

    return (
      <SelectWithIcon
        {...this.props}
        options={options}
        placeholder={this.props.placeholder || 'What\'s your riding experience?'}
        title={this.props.title || 'Riding experience'}
        // REVIEW:
        // headerText={this.props.headerText || 'Select trail difficulty'}
        // footerText={this.props.footerText || 'Choose difficulty you\'re generally comfortable riding. It will be displayed on your profile.'}
        // icon={(value) =>
        //   <OutlineIcon outlineStyle={styles.iconOutline}>
        //     <DifficultyIcon d={value} size={Layout.window.hp(6)} />
        //   </OutlineIcon>
        // }
      />
    )
  }
}

SelectDifficulty.propTypes = {
  ...SelectWithIcon.propTypes,
  value: PropTypes.oneOf(Object.keys(DifficultyIcon.icons).map(Number))
}
