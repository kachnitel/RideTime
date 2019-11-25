import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import { Route } from '../../stores/RouteStore.mobx'
import Layout from '../../constants/Layout'
import Header from '../Header'
import TerrainProfile from '../TerrainProfile'
import OutlineDifficultyIcon from '../icons/OutlineDifficultyIcon'

export default
@observer
class RouteItem extends Component {
  description = () => this.props.route.description
    ? <Text style={this.props.style}>
      {this.props.route.description}
    </Text>
    : null

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <View style={styles.titleContainer}>
          <OutlineDifficultyIcon difficulty={this.props.route.difficulty} />
          <Header style={{ ...styles.title, ...this.props.style }}>{this.props.route.title}</Header>
        </View>
        {this.description()}
        <TerrainProfile profile={this.props.route.profile} style={this.props.style} />
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
  }
})
