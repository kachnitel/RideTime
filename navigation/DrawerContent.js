
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react/native'
import { DrawerItems } from 'react-navigation'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { getEnvVars } from '../constants/Env'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import ProfileHeader from '../components/profile/ProfileHeader'
import Button from '../components/Button'
import { logger } from '../src/Logger'
import ModalView from '../components/ModalView'
import { Linking } from 'expo'

export default
@inject('UserStore')
@observer
class DrawerContent extends Component {
  lastPress = 0
  state = {
    logModalVisible: false,
    logEntries: []
  }

  printLogs = async () => {
    // Use double tap
    let delta = new Date().getTime() - this.lastPress

    if (delta < 200) {
      let logs = await logger.getMessages(25)
      this.setState({ logEntries: logs, logModalVisible: true })
    }

    this.lastPress = new Date().getTime()
  }

  hideLogModal = () => this.setState({ logModalVisible: false })

  logModal = () => <ModalView
    isVisible={this.state.logModalVisible}
    onRequestClose={this.hideLogModal}
  >
    <ScrollView>
      {this.state.logEntries.map((entry) => <View key={entry.id}>
        <Text>{JSON.stringify(entry)}</Text>
        <View style={{ height: 1, backgroundColor: 'red' }} />
      </View>)}
    </ScrollView>
    <Button
      onPress={this.sendMail}
      title='Email log'
    />
  </ModalView>

  sendMail = () => {
    let mail = 'admin@ridebikes.today'
    let body = encodeURIComponent(this.state.logEntries.map((entry) => JSON.stringify(entry)).join('\n'))
    let subject = 'Application Log ' + new Date().toISOString() + ' / ' + this.props.UserStore.currentUser.id
    let url = `mailto:${mail}?subject=${subject}&body=${body}`
    Linking.openURL(url)
  }

  render () {
    return <View style={styles.container}>
      {this.props.UserStore.loaded && <ProfileHeader user={this.props.UserStore.currentUser} />}
      <View style={styles.editProfileButton}>
        <Button
          onPress={() => this.props.navigation.navigate('EditProfile')}
          title='Edit profile'
        />
      </View>
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        <DrawerItems
          {...this.props}
          activeTintColor={'#fff'}
          activeBackgroundColor={Colors.tintColor}
        />
      </ScrollView>
      <View style={styles.footerContainer}>
        { getEnvVars().dev && <TouchableOpacity onPress={() => this.props.navigation.navigate('Dev')}>
          <Text>Dev</Text>
        </TouchableOpacity>}
        <TouchableWithoutFeedback onPress={this.printLogs}>
          <Text style={styles.versionText}>
            Version: { Constants.manifest.version }
          </Text>
        </TouchableWithoutFeedback>
        {this.logModal()}
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  versionText: {
    fontSize: Layout.window.hp(1.5),
    color: Colors.noticeText
  },
  footerContainer: {
    backgroundColor: Colors.tintColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    height: '100%',
    paddingTop: Constants.statusBarHeight
  },
  editProfileButton: {
    position: 'absolute',
    top: Constants.statusBarHeight + Layout.window.hp(1),
    left: Layout.window.hp(1)
  }
})
