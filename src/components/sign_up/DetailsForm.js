import React from 'react'
import { observer, inject } from 'mobx-react'
import Form from './Form'
import SelectDifficulty from '../form/SelectDifficulty'
import SelectBike from '../form/SelectBike'
import HomeLocationsPicker from './HomeLocationsPicker'

export default
@inject('User')
@observer
class DetailsForm extends React.Component {
  render () {
    return (
      <Form>
        <SelectDifficulty
          onValueChange={(value) => this.props.User.updateLevel(value)}
          value={this.props.User.level}
        />
        <SelectBike
          onValueChange={(value) => this.props.User.updateBike(value)}
          value={this.props.User.bike}
        />
        <HomeLocationsPicker
          onValueChange={(values) => this.props.User.updateLocations(values)}
        />
      </Form>
    )
  }
}
