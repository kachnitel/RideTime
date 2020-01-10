import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'
import Layout from '../../../constants/Layout'
import LocationItemDetail from './LocationItemDetail'
import { Location } from '../../stores/LocationStore.mobx'
import TrailforksLink from '../TrailforksLink'
import CoverPicture from './CoverPicture'
import Header from '../Header'

export default
@inject('LocationStore')
@observer
class LocationItem extends React.Component {
  location: Location
  state = {
    loading: true
  }

  async componentDidMount () {
    this.location = await this.props.LocationStore.getAsync(this.props.locationId)
    this.setState({ loading: false })
  }

  render () {
    return (
      this.state.loading
        ? <ActivityIndicator />
        : <View style={styles.container}>
          <CoverPicture
            id={this.location.coverPhoto}
            style={styles.coverPhoto}
          />
          <View style={styles.details}>
            <View style={styles.headerContainer}>
              <Header>{this.location.name}</Header>
              <TrailforksLink relativeUrl={'region/' + this.location.alias + '/'} />
            </View>
            <LocationItemDetail location={this.location} />
          </View>
        </View>
    )
  }
}

LocationItem.propTypes = {
  locationId: PropTypes.number,
  style: PropTypes.any
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
