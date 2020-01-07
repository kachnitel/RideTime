import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import Layout from '../../../constants/Layout'
import LocationItemDetail from './LocationItemDetail'
import { Location } from '../../stores/LocationStore.mobx'
import TrailforksLink from '../TrailforksLink'

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
          <View style={styles.headerContainer}>
            <Text style={styles.name} numberOfLines={1} >
              {this.location.name}
            </Text>
            <TrailforksLink relativeUrl={'region/' + this.location.alias + '/'} />
          </View>
          <LocationItemDetail location={this.location} />
        </View>
    )
  }
}

LocationItem.propTypes = {
  locationId: PropTypes.number,
  style: PropTypes.any
}

const styles = StyleSheet.create({
  name: {
    fontSize: Layout.window.hp(2.75),
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row'
  }
})
