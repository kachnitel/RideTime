import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from './Header'
import Layout from '../../constants/Layout'
import CountBadge from './CountBadge'
import Colors from '../../constants/Colors'

export default class CountHeader extends Component {
  render () {
    return (
      <View style={{ ...styles.container, ...this.props.containerStyle }}>
        <Header style={{ ...styles.header, ...this.props.style }}>{this.props.children}</Header>
        {this.props.countHighlight
          ? <CountBadge count={this.props.number} style={styles.countHighlight} />
          : <Header style={styles.count}>{this.props.number || '0'}</Header>}
      </View>
    )
  }
}

CountHeader.propTypes = {
  children: PropTypes.string,
  countHighlight: PropTypes.bool,
  number: PropTypes.number,
  containerStyle: PropTypes.any,
  style: PropTypes.any
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  header: {
    paddingRight: Layout.window.wp(2)
  },
  count: {
    color: Colors.fadedText
  },
  countHighlight: {
    fontSize: Layout.window.hp(2.5),
    fontWeight: 'bold',
    minWidth: Layout.window.hp(3)
  }
})
