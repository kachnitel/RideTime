import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import { Header } from 'react-navigation'
import { observer, inject } from 'mobx-react'
import BasicInfoForm from '../components/sign_up/BasicInfoForm'
import DetialsForm from '../components/sign_up/DetialsForm'
import Colors from '../constants/Colors'
import Button from '../components/Button'
import Layout from '../constants/Layout'
import RidersProvider from '../providers/RidersProvider'
import { SecureStore } from 'expo'

export default
@inject('UserStore')
@observer
class SignUpScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formPosition: 1,
      selectedPicture: null
    }
  }

  componentDidMount = () => {
    let user = this.props.navigation.getParam('user')
    user.name !== user.email && this.props.UserStore.updateName(user.name)
    this.props.UserStore.updateTempPicture(user.picture)
    this.props.UserStore.updateEmail(user.email)
  }

  handleScroll = (event) => {
    if (event.nativeEvent.contentOffset.x === event.nativeEvent.contentSize.width / 2) {
      this.refs.scrollView.scrollTo({ x: 0 })
      this.setState({ formPosition: 1 })
    } else {
      this.refs.scrollView.scrollToEnd()
      this.setState({ formPosition: 2 })
    }
  }

  handleSelectPicture = (image) => {
    this.setState({ selectedPicture: image })
  }

  submit = async () => {
    // TODO: Show loading
    let provider = new RidersProvider()
    let user = await provider.signUp({
      name: this.props.UserStore.name,
      hometown: this.props.UserStore.hometown,
      email: this.props.UserStore.email,
      level: this.props.UserStore.level,
      favTerrain: this.props.UserStore.bike,
      locations: this.props.UserStore.locations,
      // Only send picture if local isn't selected to prevent server processing twice
      picture: this.state.selectedPicture === null ? this.props.UserStore.tempPicture : null
    })

    if (this.state.selectedPicture) {
      user = await provider.uploadPicture(user.id, this.state.selectedPicture)
      // TODO: On fail, display a note
      // about being able to set it in profile and redirect to app
    }

    this.props.UserStore.populateFromApiResponse(user)
    let token = this.props.navigation.getParam('token')
    SecureStore.setItemAsync('refreshToken', token.refresh_token)
    // Signed up
    console.info(`User ${user.id} signed up`)
    this.props.navigation.navigate('App')
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT + 24}
        behavior='padding'
      >
        <View style={styles.form}>
          <ScrollView
            horizontal
            pagingEnabled
            bounces={false}
            ref='scrollView'
            onScrollBeginDrag={this.handlehandleScrollScroll}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            keyboardShouldPersistTaps='handled'
          >
            <BasicInfoForm
              onSelectPicture={this.handleSelectPicture}
            />
            <DetialsForm />
          </ScrollView>
          <View style={styles.controls}>
            <Button
              title={this.state.formPosition === 1 ? 'Next' : 'Previous'}
              onPress={() => {
                if (this.state.formPosition === 1) {
                  this.refs.scrollView.scrollToEnd()
                  this.setState({ formPosition: 2 })
                } else {
                  this.refs.scrollView.scrollTo({ x: 0 })
                  this.setState({ formPosition: 1 })
                }
              }}
              disabled={!this.props.UserStore.name || !this.props.UserStore.email}
            />
            {
              this.state.formPosition === 2 && <Button
                title='Sign Up!'
                onPress={this.submit}
                color='#f90'
                disabled={!this.props.UserStore.name || !this.props.UserStore.email}
              />
            }
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    height: Layout.window.hp(75)
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  note: {
    color: Colors.iconColor,
    paddingVertical: Layout.window.hp(1)
  }
})
