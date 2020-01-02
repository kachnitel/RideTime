import React from 'react'
import Layout from '../../../constants/Layout'
import SelectWithIcon from './SelectWithIcon'
import TerrainIcon from '../icons/TerrainIcon'

export default class SelectBike extends React.Component {
  render () {
    let options = Object.keys(TerrainIcon.icons).map((value) => ({
      customIcon: <TerrainIcon terrain={value} size={Layout.window.hp(6)} />,
      label: TerrainIcon.icons[value].label,
      value: value,
      icon: (this.props.value === value) ? 'check' : undefined,
      highlight: this.props.value === value
    }))

    return (
      <SelectWithIcon
        {...this.props}
        options={options}
        placeholder={this.props.placeholder || 'What\'s your primary bike?'}
        title={this.props.title || 'Your bike'}
      />
    )
  }
}

SelectBike.propTypes = {
  ...SelectWithIcon.propTypes,
  value: TerrainIcon.propTypes.terrain
}
