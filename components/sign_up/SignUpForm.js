import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import EditPicture from '../profile/EditPicture'
import Layout from '../../constants/Layout'
import FormTextInput from './FormTextInput'

export default class SignUpForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      picture: undefined
    }
  }

  _handleSelectPicture = (uri) => {
    this.setState({ picture: uri })
    // TODO: once submitted
    // RidersProvider.uploadPicture
    // POST /api/users/{id}/picture
    // Response { "uri": uploadedPictureUri }
  }

  render () {
    return (
      <View style={styles.container}>
        <EditPicture
          rider={this.props.user}
          size={Layout.window.hp(15)}
          iconSize={Layout.window.hp(5)}
          onSelect={this._handleSelectPicture}
        />
        <FormTextInput value={this.props.user.name} title='Your name' style={styles.inputContainer} />
        <FormTextInput value={this.props.user.email} title='Your E-Mail' style={styles.inputContainer} />
        <FormTextInput value={this.props.user.hometown} title='Your hometown' style={styles.inputContainer} />
        <Button
          title='Next'
          onPress={() => { console.log(this.state.picture) }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    padding: Layout.window.hp(3)
  }
})
