import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import EditPicture from '../profile/EditPicture'
import Layout from '../../constants/Layout'
import FormTextInput from './FormTextInput'
import { observer, inject } from 'mobx-react'

export default
@inject('UserStore')
@observer
class BasicInfoForm extends React.Component {
  _handleSelectPicture = (uri) => {
    this.props.UserStore.updateTempPicture(uri)
  }

  render () {
    return (
      <View style={styles.container}>
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
        />
        <FormTextInput
          value={this.props.UserStore.email}
          title='Your E-Mail'
          containerStyle={styles.inputContainer}
          onChangeText={(val) => this.props.UserStore.updateEmail(val)}
        />
        <FormTextInput
          value={this.props.UserStore.hometown}
          title='Your hometown'
          containerStyle={styles.inputContainer}
          onChangeText={(val) => this.props.UserStore.updateHometown(val)}
        />
        <Button
          title='Next'
          onPress={() => { console.log(this.props.UserStore) }}
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
