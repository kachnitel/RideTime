import React from 'react'
import { StyleSheet } from 'react-native'
import EditPicture from '../profile/EditPicture'
import Layout from '../../constants/Layout'
import TextInputWithTitle from '../form/TextInputWithTitle'
import { observer, inject } from 'mobx-react'
import Form from './Form'

export default
@inject('User')
@observer
class BasicInfoForm extends React.Component {
  _handleSelectPicture = (image) => {
    this.props.User.updateTempPicture(image.uri)
    this.props.onSelectPicture(image)
  }

  render () {
    return (
      <Form>
        {/* TODO: cover picture */}
        <EditPicture
          picture={this.props.User.tempPicture}
          size={Layout.window.hp(15)}
          iconSize={Layout.window.hp(4)}
          onSelect={this._handleSelectPicture}
        />
        <TextInputWithTitle
          value={this.props.User.name}
          title='Your name'
          containerStyle={styles.inputContainer}
          onChangeText={(val) => this.props.User.updateName(val)}
          required
        />
        <TextInputWithTitle
          value={this.props.User.email}
          title='Your E-Mail'
          containerStyle={styles.inputContainer}
          onChangeText={(val) => this.props.User.updateEmail(val)}
          required
        />
        <TextInputWithTitle
          value={this.props.User.hometown}
          title='Your hometown'
          containerStyle={styles.inputContainer}
          onChangeText={(val) => this.props.User.updateHometown(val)}
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
