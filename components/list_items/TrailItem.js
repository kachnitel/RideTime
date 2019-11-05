import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react/native'
import { Trail } from '../../stores/TrailStore.mobx'
import DifficultyIcon from '../icons/DifficultyIcon'
import Layout from '../../constants/Layout'
import Header from '../Header'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import OutlineIcon from '../icons/OutlineIcon'

export default
@observer
class TrailItem extends Component {
  profile = () => {
    let distance = this.props.trail.profile.get('distance') < 1000
      ? Math.round(this.props.trail.profile.get('distance')) + 'm'
      : (this.props.trail.profile.get('distance') / 1000).toFixed(2) + 'km'
    return <View style={styles.profileContainer}>
      <Icon name='map-marker-distance' style={this.props.style} />
      <Text style={this.props.style}>{distance}</Text>
      <Icon name='arrow-up-bold' color='red' />
      <Text style={this.props.style}>{Math.round(this.props.trail.profile.get('alt_climb'))} m</Text>
      <Icon name='arrow-down-bold' color='green' />
      <Text style={this.props.style}>{Math.round(this.props.trail.profile.get('alt_descent'))} m</Text>
    </View>
  }

  render () {
    return (
      <View {...this.props} style={{ ...styles.container, ...this.props.style }}>
        <View style={styles.titleContainer}>
          {this.props.trail.difficulty >= 0 && <OutlineIcon
            outlineStyle={styles.iconOutline}
            thickness={1.1}
          >
            <DifficultyIcon
              d={this.props.trail.difficulty}
              size={Layout.window.hp(3)}
              style={styles.difficultyIcon}
            />
          </OutlineIcon>
          }
          <Header style={{ ...styles.title, ...this.props.style }}>{this.props.trail.title}</Header>
        </View>
        {
          this.props.trail.description !== null &&
          this.props.trail.description !== '' &&
          <Text numberOfLines={2} style={this.props.style}>
            {this.props.trail.description}
          </Text>
        }
        {this.profile()}
      </View>
    )
  }
}

TrailItem.propTypes = {
  trail: PropTypes.instanceOf(Trail).isRequired
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
    // paddingLeft: Layout.window.wp(2)
  },
  difficultyIcon: {
    margin: Layout.window.wp(1)
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.window.hp(1)
  },
  iconOutline: {
    color: '#fff'
  }
})
