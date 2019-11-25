import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { Route } from '../../stores/RouteStore.mobx'
import Layout from '../../constants/Layout'
import Header from '../Header'
import TerrainProfile from '../TerrainProfile'
import OutlineDifficultyIcon from '../icons/OutlineDifficultyIcon'

export default
@inject('TrailStore')
@observer
class RouteItem extends Component {
  description = () => this.props.route.description
    ? <Text style={this.props.style}>
      {this.props.route.description}
    </Text>
    : null

  trailsList = () => <View style={styles.trailsContainer}>
    {
      this.props.route.trails.slice(0, 10).map((trailId, index) => {
        let trail = this.props.TrailStore.getSync(trailId)

        return <View key={'trail_' + trail.id + '_' + index} style={styles.trailItem}>
          <OutlineDifficultyIcon size={Layout.window.hp(2)} difficulty={trail.difficulty} />
          <Text style={{ color: this.props.style.color }}>{trail.title}</Text>
        </View>
      })
    }
    {(this.props.route.trails.length > 10) && <View style={styles.trailItem}>
      <Text style={{ color: this.props.style.color }}>...</Text>
    </View>}
  </View>

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <View style={styles.titleContainer}>
          <OutlineDifficultyIcon difficulty={this.props.route.difficulty} />
          <Header style={{ ...styles.title, ...this.props.style }}>{this.props.route.title}</Header>
        </View>
        {this.description()}
        <TerrainProfile profile={this.props.route.profile} style={this.props.style} />
        {this.trailsList()}
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
  trailItem: {
    backgroundColor: 'rgba(184, 184, 184, 0.3)',
    flexDirection: 'row',
    // textAlignVertical: 'center',
    alignItems: 'center',
    padding: Layout.window.wp(0.5),
    borderRadius: Layout.window.hp(1),
    margin: Layout.window.wp(0.5)
  },
  trailsContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
})
