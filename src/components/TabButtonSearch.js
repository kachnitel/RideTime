import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import TabButton from './TabButton'
import Layout from '../../constants/Layout'
import { View } from 'react-native-animatable'
import SearchInput from './form/SearchInput'

export default class TabButtonSearch extends Component {
  state = {
    showSearch: false
  }

  /**
   * @param {String} val
   * @memberof AddFriendScreen
   */
  handleSearchOnChange = async (val) => {
    if (val.length === 0) {
      this.props.onUpdate()
      return
    }
    if (val.length < this.props.minLength) {
      this.setState({
        typing: true
      })
      return
    }

    this.setState({
      typing: false,
      loading: true
    })
    await this.props.onUpdate(val)
    this.setState({
      loading: false
    })
  }

  showSearch = () => {
    this.setState({ showSearch: true })
  }

  hideSearch = () => {
    this.props.onUpdate()
    this.setState({ showSearch: false })
  }

  /**
   * TODO: Clear/cancel button
   */
  render () {
    return (
      <View style={styles.container}>
        { this.state.showSearch && <SearchInput
          placeholder='Search'
          {...this.props}
          style={{ ...this.props.style, ...styles.search }}
          onChangeText={this.handleSearchOnChange}
          disabled={this.state.loading}
          autoFocus
        />}
        <TabButton
          {...this.props}
          icon={this.state.showSearch ? 'close' : 'search'}
          title='Search'
          onPress={this.state.showSearch ? this.hideSearch : this.showSearch}
        />
      </View>
    )
  }
}

TabButtonSearch.propTypes = {
  ...TabButton.propTypes,
  // ...SearchInput.propTypes,
  minLength: PropTypes.any,
  onUpdate: PropTypes.func
}

TabButtonSearch.defaultProps = {
  minLength: 3
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'visible'
  },
  search: {
    width: Layout.window.wp(40),
    padding: Layout.window.wp(2),
    fontSize: Layout.window.hp(2.5)
  }
})
