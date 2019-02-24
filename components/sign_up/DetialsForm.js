import React from 'react'
import { StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import FormTextInput from './FormTextInput'
import { observer, inject } from 'mobx-react'
import Form from './Form'
import DifficultyIcon from '../icons/DifficultyIcon'
import SelectDifficulty from './SelectDifficulty'

export default
@inject('UserStore')
@observer
class DetailsForm extends React.Component {
  _handleSelectPicture = (uri) => {
    this.props.UserStore.updateTempPicture(uri)
  }

  render () {
    let options = DifficultyIcon.icons
    console.log(options)
    return (
      <Form>
        <FormTextInput
          value=''
          placeholder='Stuff'
          title='Your name'
          containerStyle={styles.inputContainer}
          onChangeText={() => {}}
        />
        <SelectDifficulty />
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: Layout.window.hp(3)
  }
})
