import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Linking } from 'expo'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { inject, observer } from 'mobx-react/native'
import { logger } from '../Logger'
import ModalView from '../components/modal/ModalView'
import Button from '../components/form/Button'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import { getEnvVars } from '../../constants/Env'

export default
@inject('UserStore')
@observer
class VersionTag extends Component {
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
    return (
      <View {...this.props}>
        <TouchableWithoutFeedback onPress={this.printLogs}>
          <Text style={styles.versionText}>
            Version: { getEnvVars().version }
          </Text>
        </TouchableWithoutFeedback>
        {this.logModal()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  versionText: {
    fontSize: Layout.window.hp(1.5),
    color: Colors.noticeText
  }
})
