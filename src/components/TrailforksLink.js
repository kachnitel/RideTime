import React, { Component } from 'react'
import { Image, StyleSheet, Linking } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import Layout from '../../constants/Layout'
import { logger } from '../Logger'

/**
 * TODO: stop propagation of click
 */
export default class TrailforksLink extends Component {
  handleTrailforksLink = async () => {
    let url = 'https://www.trailforks.com/' + this.props.relativeUrl
    let supported = await Linking.canOpenURL(url)
    if (supported) {
      Linking.openURL(url)
      return null
    }
    logger.info('Cannot open URL: ' + url)
  }

  render () {
    return (
      <TouchableNativeFeedback
        onPressIn={this.handleTrailforksLink}
        activeOpacity={1}
      >
        <Image
          source={{ uri: 'https://es.pinkbike.org/246/sprt/i/trailforks/logos/trailforks-logo-vert_notext.png' }}
          style={styles.tfIcon}
        />
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  tfIcon: {
    width: Layout.window.hp(3.5),
    height: Layout.window.hp(3)
  }
})
