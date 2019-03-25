import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Text
} from 'react-native'
import { Header } from 'react-navigation'
import { observer, inject, Provider } from 'mobx-react'
import BasicInfoForm from '../components/sign_up/BasicInfoForm'
import DetailsForm from '../components/sign_up/DetailsForm'
import Colors from '../constants/Colors'
import Button from '../components/Button'
import Layout from '../constants/Layout'
import { SecureStore } from 'expo'
import { User } from '../stores/UserStore.mobx'

export default
@inject('UserStore')
@inject('ApplicationStore')
@observer
class SignUpScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formPosition: 1,
      selectedPicture: null
    }

    this.user = this.initUser(props.navigation.getParam('user'), props.UserStore)
  }

  initUser = (userInfo, store) => {
    let user = new User(store)

    userInfo.name !== userInfo.email && user.updateName(userInfo.name)
    user.updateTempPicture({ uri: userInfo.picture, isWeb: true })
    user.updateEmail(userInfo.email)

    return user
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

  /**
   * @memberof SignUpScreen
   */
  submit = async () => {
    // TODO: Show loading
    await this.user.saveNew()

    let token = this.props.navigation.getParam('token')
    SecureStore.setItemAsync('refreshToken', token.refresh_token)
    this.props.ApplicationStore.updateUserId(this.user.id)
    // Signed up
    console.info(`User ${this.user.id} signed up`)
    this.props.navigation.navigate('App')
  }

  render () {
    return this.user ? (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT + 24}
        behavior='padding'
      >
        <View style={styles.form}>
          <Provider User={this.user}>
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
              <BasicInfoForm />
              <DetailsForm />
            </ScrollView>
          </Provider>
          <View style={styles.controls}>
            <Button
              title={this.state.formPosition === 1 ? 'Next' : 'Previous'}
              onPress={() => {
                Keyboard.dismiss() // REVIEW: Might only need on smaller screen?
                if (this.state.formPosition === 1) {
                  this.refs.scrollView.scrollToEnd()
                  this.setState({ formPosition: 2 })
                } else {
                  this.refs.scrollView.scrollTo({ x: 0 })
                  this.setState({ formPosition: 1 })
                }
              }}
              disabled={!this.user.name || !this.user.email}
            />
            {
              this.state.formPosition === 2 && <Button
                title='Sign Up!'
                onPress={this.submit}
                color='#f90'
              />
            }
          </View>
        </View>
      </KeyboardAvoidingView>
    ) : <Text>Loading</Text>
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
