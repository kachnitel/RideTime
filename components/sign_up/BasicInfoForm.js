import React from 'react'
import { StyleSheet } from 'react-native'
import EditPicture from '../profile/EditPicture'
import Layout from '../../constants/Layout'
import FormTextInput from '../form/FormTextInput'
import { observer, inject } from 'mobx-react'
import Form from './Form'

export default
@inject('UserStore')
@observer
class BasicInfoForm extends React.Component {
  _handleSelectPicture = (uri) => {
    this.props.UserStore.updateTempPicture(uri)
  }

  render () {
    return (
      <Form>
        {/* TODO: cover picture */}
        <EditPicture
          picture={this.props.UserStore.tempPicture}
          size={Layout.window.hp(15)}
          iconSize={Layout.window.hp(4)}
          onSelect={this._handleSelectPicture}
        />
        <FormTextInput
          value={this.props.UserStore.name}
          title='Your name'
          containerStyle={styles.inputContainer}
          onChangeText={(val) => this.props.UserStore.updateName(val)}
          required
        />
        <FormTextInput
          value={this.props.UserStore.email}
          title='Your E-Mail'
          containerStyle={styles.inputContainer}
          onChangeText={(val) => this.props.UserStore.updateEmail(val)}
          required
        />
        <FormTextInput
          value={this.props.UserStore.hometown}
          title='Your hometown'
          containerStyle={styles.inputContainer}
          onChangeText={(val) => this.props.UserStore.updateHometown(val)}
          placeholder='Squamish, BC'
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
