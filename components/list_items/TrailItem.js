import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import { Trail } from '../../stores/TrailStore.mobx'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../constants/Layout'
import Header from '../Header'
import OutlineIcon from '../icons/OutlineIcon'
import TerrainProfile from '../TerrainProfile'

export default
@observer
class TrailItem extends Component {
  profile = () => <TerrainProfile profile={this.props.trail.profile} style={this.props.style} />

  description = () => this.props.trail.description
    ? <Text numberOfLines={2} style={this.props.style}>
      {this.props.trail.description}
    </Text>
    : null

  difficultyIcon = () => this.props.trail.difficulty >= 0 && <OutlineIcon
    outlineStyle={styles.iconOutline}
    thickness={1.1}
    style={styles.difficultyIcon}
  >
    <DifficultyIcon
      d={this.props.trail.difficulty}
      size={Layout.window.hp(3)}
    />
  </OutlineIcon>

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <View style={styles.titleContainer}>
          {this.difficultyIcon()}
          <Header style={{ ...styles.title, ...this.props.style }}>{this.props.trail.title}</Header>
          {this.props.badge !== undefined && this.props.badge}
        </View>
        {this.description()}
        {this.profile()}
      </View>
    )
  }
}

TrailItem.propTypes = {
  trail: PropTypes.instanceOf(Trail).isRequired,
  badge: PropTypes.element
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4)
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    paddingLeft: Layout.window.wp(2)
  },
  difficultyIcon: {
    // paddingRight: Layout.window.wp(1)
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.window.hp(1)
  },
  iconOutline: {
    color: '#fff'
  },
  profileText: {
    paddingHorizontal: Layout.window.wp(1)
  }
})
