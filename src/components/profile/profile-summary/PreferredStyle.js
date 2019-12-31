import React, { Component } from 'react'
import TerrainIcon from '../../icons/TerrainIcon'
import Layout from '../../../../constants/Layout'
import SummaryItem from './SummaryItem'

export default class PreferredStyle extends Component {
  render () {
    return (
      <SummaryItem title='Bike'>
        <TerrainIcon terrain={this.props.terrain} size={Layout.window.hp(3.5)} />
      </SummaryItem>
    )
  }
}
