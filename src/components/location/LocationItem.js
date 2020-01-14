import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View
} from 'react-native'
import Layout from '../../../constants/Layout'
import LocationItemDetail from './LocationItemDetail'
import TrailforksLink from '../TrailforksLink'
import CoverPicture from './CoverPicture'
import Header from '../Header'
import { Location } from '../../stores/LocationStore.mobx'

export default class LocationItem extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <CoverPicture
          id={this.props.location.coverPhoto}
          style={styles.coverPhoto}
        />
        <View style={styles.details}>
          <View style={styles.headerContainer}>
            <Header>{this.props.location.name}</Header>
            <TrailforksLink relativeUrl={'region/' + this.props.location.alias + '/'} />
          </View>
          <LocationItemDetail location={this.props.location} />
        </View>
      </View>
    )
  }
}

LocationItem.propTypes = {
  location: PropTypes.instanceOf(Location)
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  name: {
    fontSize: Layout.window.hp(2.75),
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  coverPhoto: {
    width: '20%',
    resizeMode: 'contain',
    marginRight: Layout.window.wp(2),
    borderRadius: Layout.window.hp(1)
  },
  details: {
    flex: 1
  }
})
