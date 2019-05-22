
import React, { Component } from 'react'
import { DrawerItems } from 'react-navigation'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'

class DrawerContent extends Component {
  render () {
    return <View style={styles.container}>
      <ScrollView style={styles.itemsContainer}>
        <DrawerItems {...this.props} />
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text style={styles.versionText}>
          Version: { Constants.manifest.version }
        </Text>
      </View>
    </View>
  }
}

export default DrawerContent

const styles = StyleSheet.create({
  versionText: {
    fontSize: Layout.window.hp(1.5),
    color: Colors.noticeText
  },
  footerContainer: {
    backgroundColor: '#f50057',
    height: Layout.window.hp(2.5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemsContainer: {
    flex: 1
  },
  container: {
    height: '100%',
    paddingTop: Constants.statusBarHeight
  }
})
