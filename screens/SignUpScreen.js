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

export default
@inject('UserStore')
@observer
class SignUpScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formPosition: 1
    }
  }

  componentDidMount = () => {
    let user = this.props.navigation.getParam('user')
    user.name !== user.email && this.props.UserStore.updateName(user.name)
    this.props.UserStore.updateTempPicture(user.picture)
    this.props.UserStore.updateEmail(user.email)
  }

  handleScroll = (event) => {
    console.log(event.nativeEvent.contentOffset.x)
    if (event.nativeEvent.contentOffset.x === event.nativeEvent.contentSize.width / 2) {
      this.refs.scrollView.scrollTo({ x: 0 })
      this.setState({ formPosition: 1 })
    } else {
      this.refs.scrollView.scrollToEnd()
      this.setState({ formPosition: 2 })
    }
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT + 24}
        // style={styles.screen}
        behavior='padding'
      >
        {/*
        TODO:
        once submitted
        RidersProvider.signUp
        POST /signUp
        On submit upload UserStore.tempPicture
        (send URL in POST body or upload image if local)
        Separate from 'user' object
        Server processes the image (saves to storage)
        and returns user with updated 'picture'

        reset UserStore and populate from signed in user
        */}
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
            <BasicInfoForm />
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
                onPress={() => console.log(this.props.UserStore)}
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
