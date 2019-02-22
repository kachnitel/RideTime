import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import EditPicture from '../profile/EditPicture'
import Layout from '../../constants/Layout'
import FormTextInput from './FormTextInput'

export default class SignUpForm extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <EditPicture rider={this.props.user} size={Layout.window.hp(15)} iconSize={Layout.window.hp(5)} />
        {/* <Text>{this.props.user.name}</Text> */}
        <FormTextInput value={this.props.user.name} title='Your name' style={styles.inputContainer} />
        <FormTextInput value={this.props.user.email} title='Your E-Mail' style={styles.inputContainer} />
        <FormTextInput value={this.props.user.hometown} title='Your hometown' style={styles.inputContainer} />
        <Text>[Next button]</Text>
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
