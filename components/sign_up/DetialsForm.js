import React from 'react'
import { StyleSheet } from 'react-native'
import Layout from '../../constants/Layout'
import FormTextInput from './FormTextInput'
import { observer, inject } from 'mobx-react'
import Form from './Form'

export default
@inject('UserStore')
@observer
class DetailsForm extends React.Component {
  _handleSelectPicture = (uri) => {
    this.props.UserStore.updateTempPicture(uri)
  }

  render () {
    return (
      <Form>
        <FormTextInput
          value=''
          placeholder='Stuff'
          title='Your name'
          containerStyle={styles.inputContainer}
          onChangeText={() => {}}
        />
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: Layout.window.hp(3)
  }
})
