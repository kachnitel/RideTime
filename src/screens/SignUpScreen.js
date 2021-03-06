import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  BackHandler,
  ActivityIndicator
} from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { Header } from 'react-navigation'
import { observer, inject, Provider } from 'mobx-react'
import BasicInfoForm from '../components/sign_up/BasicInfoForm'
import DetailsForm from '../components/sign_up/DetailsForm'
import Colors from '../../constants/Colors'
import Button from '../components/form/Button'
import Layout from '../../constants/Layout'
import { User } from '../stores/UserStore.mobx'
import { logger } from '../Logger'
import { alertAsync } from '../AsyncAlert'
import Authentication from '../Authentication'

export default
@inject('UserStore')
@inject('ApplicationStore')
@observer
class SignUpScreen extends React.Component {
  backHandler

  constructor (props) {
    super(props)

    this.state = {
      formPosition: 1,
      selectedPicture: null,
      loading: false
    }

    this.user = this.initUser(props.navigation.getParam('user'), props.UserStore)
  }

  componentDidMount () {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    )
  }

  componentWillUnmount () {
    this.backHandler.remove()
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
      this.scrollTo(1)
    } else {
      this.scrollTo(2)
    }
  }

  scrollTo = (position: Number) => {
    switch (position) {
      case 1:
        this.refs.scrollView.scrollTo({ x: 0 })
        break
      case 2:
        this.refs.scrollView.scrollToEnd()
        break
      default:
        throw new Error('Trying to scroll to unknown position')
    }

    this.setState({ formPosition: position })
  }

  handleBackPress = () => {
    this.exit()
    return true
  }

  exit = async () => {
    let exit = await alertAsync(
      'Cancel signing up?',
      'Are you sure?',
      'Yes',
      'No'
    )

    if (exit) {
      let auth = new Authentication()
      await auth.logoutFromAuth0()
      this.props.navigation.navigate('SignIn')
    }
  }

  /**
   * @memberof SignUpScreen
   */
  submit = async () => {
    this.setState({ loading: true })
    let user = await this.props.UserStore.signUp(this.user)

    let token = this.props.navigation.getParam('token')
    SecureStore.setItemAsync('refreshToken', token.refresh_token)
    this.props.ApplicationStore.updateUserId(user.id)
    // Signed up
    logger.info(`User ${user.id} signed up`)
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
              onScrollBeginDrag={this.handleScroll}
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
                  this.scrollTo(2)
                } else {
                  this.scrollTo(1)
                }
              }}
              disabled={!this.user.name || !this.user.email}
            />
            {
              this.state.formPosition === 2 && (this.state.loading
                ? <ActivityIndicator />
                : <Button
                  title='Sign Up!'
                  onPress={this.submit}
                  color={Colors.confirmationHighlight}
                  disabled={this.state.loading}
                />)
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
