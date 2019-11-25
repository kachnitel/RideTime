import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import { Route } from '../../stores/RouteStore.mobx'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../constants/Layout'
import Header from '../Header'
import OutlineIcon from '../icons/OutlineIcon'
import TerrainProfile from '../TerrainProfile'

export default
@observer
class RouteItem extends Component {
  /**
   * TODO: Dedupe to component(s)
   *
   * @memberof RouteItem
   */
  profile = () => <TerrainProfile profile={this.props.route.profile} style={this.props.style} />

  description = () => this.props.route.description
    ? <Text style={this.props.style}>
      {this.props.route.description}
    </Text>
    : null

  difficultyIcon = () => this.props.route.difficulty >= 0 && <OutlineIcon
    outlineStyle={styles.iconOutline}
    thickness={1.1}
    style={styles.difficultyIcon}
  >
    <DifficultyIcon
      d={this.props.route.difficulty}
      size={Layout.window.hp(3)}
    />
  </OutlineIcon>

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <View style={styles.titleContainer}>
          {this.difficultyIcon()}
          <Header style={{ ...styles.title, ...this.props.style }}>{this.props.route.title}</Header>
        </View>
        {this.description()}
        {this.profile()}
      </View>
    )
  }
}

RouteItem.propTypes = {
  route: PropTypes.instanceOf(Route).isRequired,
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
  iconOutline: {
    color: '#fff'
  }
})
