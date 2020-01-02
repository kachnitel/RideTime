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
        ? <ActivityIndicator style={{ ...styles.container, ...this.props.style }} />
        : <View style={{ ...styles.container, ...this.props.style }}>
          <Text style={{ ...styles.name, ...this.props.style }} numberOfLines={1} >
            {this.location.name}
          </Text>
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
  container: {
    height: Layout.window.hp(10),
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4),
    flexDirection: 'row'
  }
})
