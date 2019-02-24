import React from 'react'
import { observer, inject } from 'mobx-react'
import Form from './Form'
import SelectDifficulty from './SelectDifficulty'

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
      </Form>
    )
  }
}
