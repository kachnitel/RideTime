import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ModalView from '../../modal/ModalView'
import MenuModalOption from '../../modal/MenuModalOption'
import Header from '../../Header'
import Colors from '../../../../constants/Colors'
import Layout from '../../../../constants/Layout'

export default class SetPrivacy extends Component {
  state = {
    showPrivacySettings: false
  }

  hidePrivacySettings = () => this.setState({ showPrivacySettings: false })

  render () {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ showPrivacySettings: true })}
        >
          <Text style={styles.link}>Privacy settings</Text>
        </TouchableOpacity>
        <ModalView
          isVisible={this.state.showPrivacySettings}
          onBackdropPress={this.hidePrivacySettings}
          onBackButtonPress={this.hidePrivacySettings}
          onClose={this.hidePrivacySettings}
        >
          {/* TODO: Use SectionList */}
          <Header style={styles.header}>Privacy</Header>
          <MenuModalOption
            style={styles.option}
            onPress={() => this.props.onPrivacyUpdate(false)}
            label='Public'
            description='Anyone who can see the ride can join automatically'
            icon='lock-open'
            highlight={!this.props.private}
          />
          <MenuModalOption
            style={styles.option}
            onPress={() => this.props.onPrivacyUpdate(true)}
            label='Private'
            icon='lock-outline'
            description='Every user needs to be approved by a member to join'
            highlight={this.props.private}
          />
          <Header style={styles.header}>Visibility</Header>
          <MenuModalOption
            style={styles.option}
            onPress={() => this.props.onVisibilityUpdate('public')}
            label='Public'
            icon='public'
            description='Anyone can see the ride'
            highlight={this.props.visibility === 'public'}
          />
          <MenuModalOption
            style={styles.option}
            onPress={() => this.props.onVisibilityUpdate('invited')}
            label='Private'
            icon='lock-outline'
            description='Only members and invited users can see the ride'
            highlight={this.props.visibility === 'invited'}
          />
          <MenuModalOption
            style={styles.option}
            onPress={() => this.props.onVisibilityUpdate('friends')}
            label='Friends'
            icon='people-outline'
            description='Only your friends and invited users can see the event'
            highlight={this.props.visibility === 'friends'}
          />
          <MenuModalOption
            style={styles.option}
            onPress={() => this.props.onVisibilityUpdate('memberfriends')}
            label='Friends of all members'
            icon='people'
            description='Only friends of members and invited users can see the event'
            highlight={this.props.visibility === 'memberfriends'}
          />
          <View style={styles.bottomSeparator} />
        </ModalView>
      </View>
    )
  }
}

SetPrivacy.propTypes = {
  onPrivacyUpdate: PropTypes.func,
  onVisibilityUpdate: PropTypes.func
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: Layout.window.hp(1),
    width: '100%',
    textAlign: 'center',
    backgroundColor: Colors.tintColor,
    color: Colors.secondaryText
  },
  link: {
    color: Colors.secondaryText,
    opacity: 0.75,
    padding: Layout.window.hp(1)
  },
  option: {
    height: Layout.window.hp(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.tabIconDefault
  },
  bottomSeparator: {
    // flex: 1,
    width: '100%',
    height: 1,
    backgroundColor: Colors.tintColor
  }
})
