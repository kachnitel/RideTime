import React from 'react'
import { observer, inject } from 'mobx-react'
import Form from './Form'
import SelectDifficulty from './SelectDifficulty'
import SelectBike from './SelectBike'
import HomeLocationsPicker from './HomeLocationsPicker'

export default
@inject('UserStore')
@observer
class DetailsForm extends React.Component {
  render () {
    return (
      <Form>
        <SelectDifficulty
          max={3}
          onValueChange={(value) => this.props.UserStore.updateLevel(value.value)}
        />
        <SelectBike
          onValueChange={(value) => this.props.UserStore.updateBike(value.value)}
        />
        <HomeLocationsPicker
          onValueChange={(values) => this.props.UserStore.updateLocations(values)}
        />
      </Form>
    )
  }
}
