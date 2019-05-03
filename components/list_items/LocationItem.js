import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Layout from '../../constants/Layout'
import LocationItemDetail from '../LocationItemDetail'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react/native'

export default
@inject('LocationStore')
@observer
class LocationItem extends React.Component {
  state = {
    location: null
  }

  async componentDidMount () {
    let location = await this.props.LocationStore.get(this.props.locationId)
    this.setState({
      location: location
    })
  }

  render () {
    return (
      this.state.location && <View style={{ ...styles.container, ...this.props.style }}>
        <Text style={{ ...styles.name, ...this.props.style }} numberOfLines={1} >
          {this.state.location.name}
        </Text>
        <LocationItemDetail location={this.state.location} />
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
    height: Layout.window.hp(15),
    paddingVertical: Layout.window.hp(1.5),
    paddingHorizontal: Layout.window.wp(4)
  }
})
