
import React, { Component } from 'react'
import { DrawerItems } from 'react-navigation'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { getEnvVars } from '../constants/Env'
import { TouchableOpacity } from 'react-native-gesture-handler'

class DrawerContent extends Component {
  render () {
    return <View style={styles.container}>
      <ScrollView style={styles.itemsContainer}>
        <DrawerItems {...this.props} />
      </ScrollView>
      <View style={styles.footerContainer}>
        { getEnvVars().dev && <TouchableOpacity onPress={() => this.props.navigation.navigate('Dev')}>
          <Text>Dev</Text>
        </TouchableOpacity>}
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
