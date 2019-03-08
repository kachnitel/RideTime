import React from 'react'
import Layout from '../../constants/Layout'
import SelectWithIcon from '../form/SelectWithIcon'
import TerrainIcon from '../icons/TerrainIcon'

export default class SelectBike extends React.Component {
  render () {
    const options = Object.keys(TerrainIcon.icons).map((value) => {
      return ({
        value: value,
        ...TerrainIcon.icons[value]
      })
    })

    return (
      <SelectWithIcon
        {...this.props}
        options={options}
        placeholder={'What\'s your primary bike?'}
        headerText='Select bike type'
        footerText={'Choose what kind of bike do you ride most often. It will be displayed on yor profile.'}
        title={'Your bike'}
        icon={(value) => <TerrainIcon terrain={value} size={Layout.window.hp(6)} />}
      />
    )
  }
}

SelectBike.propTypes = SelectWithIcon.propTypes
