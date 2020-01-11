import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
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
    <FlatList
      data={this.state.logEntries.reverse()}
      inverted
      renderItem={this.logEntry}
      keyExtractor={({ id }) => 'log_' + id}
    />
    <Button
      onPress={this.sendMail}
      title='Email log'
    />
  </ModalView>

  logEntry = (item) => {
    let entry = item.item
    let context = JSON.stringify(JSON.parse(entry.context), null, 2)
    let levelColor = {
      debug: '#222',
      info: '#080',
      warn: '#740',
      error: '#800'
    }[entry.level]

    return <View style={styles.logEntryContainer}>
      <View style={{ ...styles.logEntryHeader, backgroundColor: levelColor }}>
        <Text style={styles.logEntryHeaderText}>{entry.id}</Text>
        <Text style={styles.logEntryHeaderText}>{entry.level}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.logMessage}>{entry.message}</Text>
        <Text>{context}</Text>
      </View>
    </View>
  }

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
    color: Colors.listHeaderBackground
  },
  logEntryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: Layout.window.hp(2),
    borderTopLeftRadius: Layout.window.hp(1),
    borderTopRightRadius: Layout.window.hp(1)
  },
  logEntryHeaderText: {
    color: Colors.secondaryText,
    fontWeight: 'bold'
  },
  messageContainer: {
    padding: Layout.window.hp(1)
  },
  logMessage: {
    fontWeight: 'bold'
  },
  logEntryContainer: {
    margin: Layout.window.hp(1),
    backgroundColor: Colors.itemBackground,
    borderColor: Colors.fadedText,
    borderWidth: 1,
    borderRadius: Layout.window.hp(1)
  }
})
