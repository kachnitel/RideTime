import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { Route } from '../../../stores/RouteStore.mobx'
import Layout from '../../../../constants/Layout'
import Colors from '../../../../constants/Colors'
import Header from '../../Header'
import TerrainProfile from '../../TerrainProfile'
import OutlineDifficultyIcon from '../../icons/OutlineDifficultyIcon'
import TrailforksLink from '../../TrailforksLink'

export default
@inject('TrailStore')
@observer
class RouteItem extends Component {
  description = () => this.props.route.description
    ? <Text>
      {this.props.route.description}
    </Text>
    : null

  trailsList = () => <View style={styles.trailsContainer}>
    {
      this.props.route.trails.slice(0, 10).map((trailId, index) => {
        let trail = this.props.TrailStore.get(trailId)

        return <View key={'trail_' + trail.id + '_' + index} style={styles.trailItem}>
          <OutlineDifficultyIcon size={Layout.window.hp(2)} difficulty={trail.difficulty} />
          <Text>{trail.title}</Text>
        </View>
      })
    }
    {(this.props.route.trails.length > 10) && <View style={styles.trailItem}>
      <Text>...</Text>
    </View>}
  </View>

  trailforksLink = () => <View style={styles.tfLinkContainer}>
    <TrailforksLink relativeUrl={'route/' + this.props.route.alias + '/'} />
  </View>

  render () {
    return (
      <View {...this.props}>
        <View style={styles.titleContainer}>
          <OutlineDifficultyIcon difficulty={this.props.route.difficulty} />
          <Header style={styles.title}>{this.props.route.title}</Header>
          {this.trailforksLink()}
        </View>
        {this.description()}
        <TerrainProfile profile={this.props.route.profile} />
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    paddingLeft: Layout.window.wp(2),
    flex: 1
  },
  trailItem: {
    flexDirection: 'row',
    backgroundColor: Colors.itemBackground,
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
  },
  tfLinkContainer: {
    marginLeft: 'auto'
  }
})
