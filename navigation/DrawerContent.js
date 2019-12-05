
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react/native'
import { DrawerItems } from 'react-navigation'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import { getEnvVars } from '../constants/Env'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ProfileHeader from '../components/profile/ProfileHeader'
import Button from '../components/Button'

export default
@inject('UserStore')
@observer
class DrawerContent extends Component {
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
        <Text style={styles.versionText}>
          Version: { Constants.manifest.version }
        </Text>
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
