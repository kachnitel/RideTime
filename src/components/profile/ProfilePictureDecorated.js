import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import ProfilePicture from './ProfilePicture'
import OutlineIcon from '../icons/OutlineIcon'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../../constants/Layout'
import Colors from '../../../constants/Colors'

export default class ProfilePictureDecorated extends Component {
  renderDiffIcon = () => {
    return this.props.user.level != null
      ? <View style={styles.diffIcon}>
        <OutlineIcon thickness={1.075} outlineStyle={styles.outlineIcon}>
          <DifficultyIcon d={this.props.user.level} size={Layout.window.hp(3.5)} />
        </OutlineIcon>
      </View>
      : <></>
  }

  render () {
    return <View {...this.props}>
      <ProfilePicture picture={this.props.user.picture} size={Layout.window.hp(7)} />
      {this.renderDiffIcon()}
    </View>
  }
}

ProfilePictureDecorated.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.string,
    level: PropTypes.oneOf(Object.keys(DifficultyIcon.icons).map(Number))
  })
}

const styles = StyleSheet.create({
  picture: {
  },
  diffIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5
  },
  outlineIcon: {
    color: Colors.secondaryText
  }
})
