import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import { Trail } from '../../../stores/TrailStore.mobx'
import Layout from '../../../../constants/Layout'
import Header from '../../Header'
import TerrainProfile from '../../TerrainProfile'
import OutlineDifficultyIcon from '../../icons/OutlineDifficultyIcon'
import TrailforksLink from '../../TrailforksLink'

export default
@observer
class TrailItem extends Component {
  shouldComponentUpdate = (nextProps, nextState, nextContext) => {
    return (this.props.badge !== nextProps.badge) || (this.props.trail !== nextProps.trail)
  }

  description = () => this.props.trail.description
    ? <Text numberOfLines={2} style={this.props.style}>
      {this.props.trail.description}
    </Text>
    : null

  render () {
    return (
      <View {...this.props} style={styles.container}>
        <View style={styles.titleContainer}>
          <OutlineDifficultyIcon difficulty={this.props.trail.difficulty} />
          <Header style={styles.title}>{this.props.trail.title}</Header>
          <View style={styles.headerIcons}>
            {this.props.badge !== undefined && this.props.badge}
            <TrailforksLink relativeUrl={'trails/' + this.props.trail.alias + '/'} />
          </View>
        </View>
        {this.description()}
        <TerrainProfile profile={this.props.trail.profile} style={this.props.style} />
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
  headerIcons: {
    marginLeft: 'auto',
    flexDirection: 'row'
  }
})
